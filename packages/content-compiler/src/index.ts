import { readdir } from "node:fs/promises";
import * as path from "node:path";
import type { ContentBundle } from "@dsd/contracts";

export type LegacySourceKind = "info" | "qdisplay" | "scene" | "unknown";

export interface LegacySourceFile {
  kind: LegacySourceKind;
  path: string;
}

export function detectLegacySourceKind(filePath: string): LegacySourceKind {
  if (filePath.endsWith(".scene.dry")) {
    return "scene";
  }

  if (filePath.endsWith(".qdisplay.dry")) {
    return "qdisplay";
  }

  if (filePath.endsWith(".info.dry")) {
    return "info";
  }

  return "unknown";
}

export async function listLegacySourceFiles(rootDir: string): Promise<LegacySourceFile[]> {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(rootDir, entry.name);

      if (entry.isDirectory()) {
        return listLegacySourceFiles(entryPath);
      }

      if (!entry.isFile()) {
        return [];
      }

      const kind = detectLegacySourceKind(entryPath);
      if (kind === "unknown") {
        return [];
      }

      return [{ kind, path: entryPath }];
    }),
  );

  return nested.flat().sort((left, right) => left.path.localeCompare(right.path));
}

export interface ContentValidationIssue {
  severity: "error" | "warning";
  code: string;
  message: string;
  sceneId?: string;
}

export interface ContentValidationOptions {
  missingChoiceTargetSeverity?: "error" | "warning";
}

const REQUIRED_CONDITIONS = new Set(["flags.compare", "flags.expression", "legacy.expression"]);
const REQUIRED_EFFECTS = new Set(["flags.patch", "ui.legacyLayout", "legacy.script", "legacy.goto"]);
const SPECIAL_CHOICE_TARGETS = new Set(["backSpecialScene"]);

export function validateContentBundle(
  bundle: ContentBundle,
  options: ContentValidationOptions = {},
): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];
  const sceneIds = new Set(Object.keys(bundle.scenes));
  const tagIds = new Set(
    Object.values(bundle.scenes).flatMap((scene) => scene.tags ?? []),
  );
  const missingChoiceTargetSeverity = options.missingChoiceTargetSeverity ?? "error";

  if (!sceneIds.has(bundle.initialSceneId)) {
    issues.push({
      severity: "error",
      code: "missing-initial-scene",
      message: `Initial scene '${bundle.initialSceneId}' is not present in the content bundle.`,
    });
  }

  for (const [sceneId, scene] of Object.entries(bundle.scenes)) {
    if (scene.id !== sceneId) {
      issues.push({
        severity: "error",
        code: "scene-id-mismatch",
        sceneId,
        message: `Scene key '${sceneId}' does not match scene id '${scene.id}'.`,
      });
    }

    for (const condition of scene.conditions ?? []) {
      if (!REQUIRED_CONDITIONS.has(condition.id)) {
        issues.push({
          severity: "error",
          code: "unknown-condition",
          sceneId,
          message: `Scene '${sceneId}' references unknown condition '${condition.id}'.`,
        });
      }
    }

    for (const effect of [...(scene.onArrival ?? []), ...(scene.onDisplay ?? [])]) {
      if (!REQUIRED_EFFECTS.has(effect.id)) {
        issues.push({
          severity: "error",
          code: "unknown-effect",
          sceneId,
          message: `Scene '${sceneId}' references unknown effect '${effect.id}'.`,
        });
      }
    }

    for (const choice of scene.choices) {
      if (
        choice.nextSceneId &&
        !sceneIds.has(choice.nextSceneId) &&
        !tagIds.has(choice.nextSceneId) &&
        !SPECIAL_CHOICE_TARGETS.has(choice.nextSceneId)
      ) {
        issues.push({
          severity: missingChoiceTargetSeverity,
          code: "missing-choice-target",
          sceneId,
          message: `Choice '${choice.id}' points to missing scene '${choice.nextSceneId}'.`,
        });
      }

      for (const condition of choice.conditions ?? []) {
        if (!REQUIRED_CONDITIONS.has(condition.id)) {
          issues.push({
            severity: "error",
            code: "unknown-choice-condition",
            sceneId,
            message: `Choice '${choice.id}' references unknown condition '${condition.id}'.`,
          });
        }
      }

      for (const effect of choice.effects ?? []) {
        if (!REQUIRED_EFFECTS.has(effect.id)) {
          issues.push({
            severity: "error",
            code: "unknown-choice-effect",
            sceneId,
            message: `Choice '${choice.id}' references unknown effect '${effect.id}'.`,
          });
        }
      }
    }
  }

  return issues;
}

export function assertValidContentBundle(
  bundle: ContentBundle,
  options: ContentValidationOptions = {},
): void {
  const issues = validateContentBundle(bundle, options);
  const errors = issues.filter((issue) => issue.severity === "error");

  if (errors.length > 0) {
    throw new Error(errors.map((issue) => `[${issue.code}] ${issue.message}`).join("\n"));
  }
}
