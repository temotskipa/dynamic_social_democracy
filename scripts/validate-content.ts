import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { assertValidContentBundle, validateContentBundle } from "@dsd/content-compiler";
import type { ContentValidationIssue } from "@dsd/content-compiler";
import type { ContentBundle } from "@dsd/contracts";

const bundlePath = "apps/web/src/content/generated/legacy-content.json";
const reportPath = "apps/web/src/content/generated/legacy-content.report.json";
const assetRoot = "apps/web/public";
const bundle = JSON.parse(readFileSync(bundlePath, "utf-8")) as ContentBundle;
const assetRootPath = path.resolve(assetRoot);
const assetRootPathWithSeparator = assetRootPath.endsWith(path.sep)
  ? assetRootPath
  : `${assetRootPath}${path.sep}`;

function validateAssetReferences(contentBundle: ContentBundle): ContentValidationIssue[] {
  return contentBundle.assets.references.flatMap((assetReference) => {
    const normalizedReference = path.normalize(assetReference);
    const resolvedAssetPath = path.resolve(assetRootPath, normalizedReference);

    if (
      path.isAbsolute(assetReference) ||
      normalizedReference.startsWith("..") ||
      !resolvedAssetPath.startsWith(assetRootPathWithSeparator)
    ) {
      return [
        {
          severity: "error",
          code: "unsafe-asset-reference",
          message: `Asset reference '${assetReference}' does not stay inside '${assetRoot}'.`,
        },
      ];
    }

    if (!existsSync(resolvedAssetPath)) {
      return [
        {
          severity: "error",
          code: "missing-asset",
          message: `Asset reference '${assetReference}' is missing from '${assetRoot}'.`,
        },
      ];
    }

    return [];
  });
}

function countMechanicsUsage(contentBundle: ContentBundle) {
  const conditions: Record<string, number> = {};
  const effects: Record<string, number> = {};

  function countCondition(id: string) {
    conditions[id] = (conditions[id] ?? 0) + 1;
  }

  function countEffect(id: string) {
    effects[id] = (effects[id] ?? 0) + 1;
  }

  for (const scene of Object.values(contentBundle.scenes)) {
    for (const condition of scene.conditions ?? []) countCondition(condition.id);
    for (const effect of [...(scene.onArrival ?? []), ...(scene.onDisplay ?? [])]) countEffect(effect.id);

    for (const choice of scene.choices) {
      for (const condition of choice.conditions ?? []) countCondition(condition.id);
      for (const effect of choice.effects ?? []) countEffect(effect.id);
    }
  }

  return {
    conditions: Object.fromEntries(Object.entries(conditions).sort(([left], [right]) => left.localeCompare(right))),
    effects: Object.fromEntries(Object.entries(effects).sort(([left], [right]) => left.localeCompare(right))),
  };
}

const issues = [
  ...validateContentBundle(bundle, {
    missingChoiceTargetSeverity: "warning",
  }),
  ...validateAssetReferences(bundle),
];
const warnings = issues.filter((issue) => issue.severity === "warning");
const errors = issues.filter((issue) => issue.severity === "error");
const mechanicsUsage = countMechanicsUsage(bundle);

assertValidContentBundle(bundle, {
  missingChoiceTargetSeverity: "warning",
});

if (errors.length > 0) {
  throw new Error(errors.map((issue) => `[${issue.code}] ${issue.message}`).join("\n"));
}

writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      bundleId: bundle.metadata.id,
      generatedAt: bundle.metadata.generatedAt,
      assetRoot,
      mechanicsUsage,
      issueCount: issues.length,
      issues,
    },
    null,
    2,
  )}\n`,
);

console.log(
  [
    `Validated ${Object.keys(bundle.scenes).length} scenes`,
    `${Object.keys(bundle.qdisplays).length} qdisplays`,
    `${bundle.assets.references.length} asset references`,
    `${mechanicsUsage.effects["legacy.script"] ?? 0} legacy script refs`,
    `${warnings.length} warnings`,
  ].join(", "),
);
