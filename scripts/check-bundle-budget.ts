import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const assetsDir = "out/html/assets";
const maxJsBytes = 13_500_000;
const maxGzipBytes = 2_100_000;

const jsAssets = readdirSync(assetsDir)
  .filter((fileName) => fileName.endsWith(".js"))
  .map((fileName) => join(assetsDir, fileName));

if (jsAssets.length === 0) {
  console.error(`No JavaScript assets found in ${assetsDir}. Run the web build before checking bundle budget.`);
  process.exitCode = 1;
} else {
  const totals = jsAssets.reduce(
    (nextTotals, assetPath) => {
      const source = readFileSync(assetPath);
      return {
        bytes: nextTotals.bytes + statSync(assetPath).size,
        gzipBytes: nextTotals.gzipBytes + gzipSync(source).byteLength,
      };
    },
    { bytes: 0, gzipBytes: 0 },
  );

  const failures = [
    totals.bytes > maxJsBytes
      ? `JS assets are ${totals.bytes} bytes, over budget ${maxJsBytes} bytes.`
      : undefined,
    totals.gzipBytes > maxGzipBytes
      ? `Gzipped JS assets are ${totals.gzipBytes} bytes, over budget ${maxGzipBytes} bytes.`
      : undefined,
  ].filter((failure): failure is string => failure !== undefined);

  if (failures.length > 0) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Bundle budget ok: ${totals.bytes} JS bytes, ${totals.gzipBytes} gzipped JS bytes.`,
    );
  }
}
