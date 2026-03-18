import { expect, test } from "@playwright/test";

async function collectRuntimeErrors(page: Parameters<typeof test>[0]["page"]) {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  return { pageErrors, consoleErrors };
}

async function readSnapshot(page: Parameters<typeof test>[0]["page"]) {
  return JSON.parse((await page.evaluate(() => window.render_game_to_text?.() ?? "{}")));
}

async function readReadySnapshot(page: Parameters<typeof test>[0]["page"]) {
  await expect
    .poll(async () => {
      const snapshot = await readSnapshot(page);
      return snapshot.sceneId ?? null;
    })
    .not.toBeNull();

  return readSnapshot(page);
}

async function gotoFreshGame(page: Parameters<typeof test>[0]["page"]) {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
}

test("boots to the start menu, reaches credits, and returns back", async ({ page }) => {
  const { pageErrors, consoleErrors } = await collectRuntimeErrors(page);

  await gotoFreshGame(page);

  const initialSnapshot = await readReadySnapshot(page);

  expect(initialSnapshot.sceneId).toBe("start_menu_2");
  expect(initialSnapshot.persistence).toEqual({
    adapterKind: "local",
    hasPersistedSession: false,
  });
  expect(initialSnapshot.visibleChoices).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ text: "Start game" }),
      expect.objectContaining({ text: "Credits" }),
    ]),
  );

  await expect(page.getByRole("heading", { name: "start_menu_2" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Start game" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Credits" })).toBeVisible();

  await page.getByRole("button", { name: "Credits" }).click();
  await expect(page.getByRole("heading", { name: "Credits" })).toBeVisible();

  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("credits");
  await expect(page.getByText("Many works were referenced in the making of this game.")).toBeVisible();

  await page.getByRole("button", { name: "Back" }).click();
  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("root");
  await expect(page.getByRole("heading", { name: "Root Scene" })).toBeVisible();
  await expect(page.getByText("No choices available.")).toBeVisible();

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("can enter the start game flow", async ({ page }) => {
  const { pageErrors, consoleErrors } = await collectRuntimeErrors(page);

  await gotoFreshGame(page);

  await page.getByRole("button", { name: "Start game" }).click();

  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("start_1");
  await expect(page.getByText("No choices available.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "start_1" })).toBeVisible();

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("can save, reload, restore, and reset a local session", async ({ page }) => {
  const { pageErrors, consoleErrors } = await collectRuntimeErrors(page);

  await gotoFreshGame(page);

  await page.getByRole("button", { name: "Credits" }).click();
  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("credits");

  await page.getByRole("button", { name: "Save Session" }).click();
  await expect(page.getByRole("status")).toContainText("Session saved locally.");
  await expect(page.getByRole("button", { name: "Load Session" })).toBeEnabled();

  const savedSnapshot = await readSnapshot(page);
  expect(savedSnapshot.persistence).toEqual({
    adapterKind: "local",
    hasPersistedSession: true,
  });

  await page.getByRole("button", { name: "Back" }).click();
  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("root");

  await page.getByRole("button", { name: "Load Session" }).click();
  await expect(page.getByRole("status")).toContainText("Saved session loaded.");
  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("credits");

  await page.reload();
  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("credits");

  await page.getByRole("button", { name: "New Session" }).click();
  await expect(page.getByRole("status")).toContainText("Started a new session.");
  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("start_menu_2");
  await expect(page.getByRole("button", { name: "Load Session" })).toBeDisabled();

  const resetSnapshot = await readSnapshot(page);
  expect(resetSnapshot.persistence).toEqual({
    adapterKind: "local",
    hasPersistedSession: false,
  });

  await page.reload();
  await expect
    .poll(async () => {
      return (await readSnapshot(page)).sceneId;
    })
    .toBe("start_menu_2");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
