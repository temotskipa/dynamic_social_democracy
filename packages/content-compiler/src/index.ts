import { readdir } from "node:fs/promises";
import * as path from "node:path";

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
