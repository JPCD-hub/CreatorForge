import { expect, test, devices, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const viewports = [[320, 568], [360, 800], [375, 667], [390, 844], [393, 852], [412, 915], [430, 932], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080]] as const;
const deviceNames = ["iPhone SE", "iPhone 13", "iPhone 15 Pro", "Pixel 7", "Galaxy S9+", "iPad Mini"] as const;
const plans = ["Forge Start", "Forge Landing", "Forge Web", "Forge Creator", "Forge Custom"];

async function assertNoHorizontalScroll(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
}

async function fillValidQuote(page: Page) {
  await page.locator("#contact-name").fill("Ana Gómez-López");
  await page.locator("#contact-email").fill("ana@example.com");
  await page.locator("#contact-phone").fill("+57 305 776 4810");
  await page.locator("#contact-project").fill("Proyecto con Ñ y emojis ✨");
  await page.locator("#contact-service").selectOption({ index: 2 });
  await page.locator("#contact-budget").selectOption({ index: 3 });
  await page.locator("#contact-date").fill("2030-01-02");
  await page.locator("#contact-description").fill("Una descripción con tildes, saltos de línea\ny suficientes detalles para validar WhatsApp.");
}

async function expectNoSeriousAxe(page: Page) {
  const axe = await new AxeBuilder({ page }).analyze();
  expect(axe.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
}

test("every target viewport has no horizontal scroll and captures a full-page reference", async ({ page }, testInfo) => {
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await assertNoHorizontalScroll(page);
    await expect(page.locator(".whatsapp-float")).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`viewport-${width}x${height}.png`), fullPage: true });
  }
});

test("equivalent mobile devices remain scroll-safe", async ({ browser }) => {
  for (const deviceName of deviceNames) {
    const context = await browser.newContext({ ...devices[deviceName] });
    const page = await context.newPage();
    await page.goto("/");
    await assertNoHorizontalScroll(page);
    if (devices[deviceName].isMobile) await expect(page.locator(".menu-button")).toBeVisible();
    await context.close();
  }
});

test("mobile menu traps keyboard focus, locks scroll, closes on Escape, navigation, and resize", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.locator(".menu-button");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("#mobile-menu a").first()).toBeFocused();
  await page.locator("#mobile-menu a").last().focus();
  await page.keyboard.press("Tab");
  await expect(page.locator("#mobile-menu a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page.locator("#mobile-menu").getByRole("link", { name: "Planes", exact: true }).click();
  await expect(page).toHaveURL(/#planes$/);
  await expect(page.locator(".mobile-menu")).toHaveCount(0);
  await trigger.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("motion pause persists for the session and reduced motion disables continuous animation", async ({ page, browser }) => {
  await page.goto("/");
  const toggle = page.locator(".marquee-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-motion-paused", "true");
  await expect(page.locator(".marquee-track")).toHaveCSS("animation-play-state", "paused");
  await page.reload();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("/");
  await expect(reducedPage.locator(".marquee-toggle")).toBeDisabled();
  await expect(reducedPage.locator(".forge-contour")).toHaveCSS("animation-name", "none");
  await reducedContext.close();
});

test("all project dialogs are modal, inert the page, and restore focus", async ({ page }) => {
  await page.goto("/#proyectos");
  const buttons = page.locator(".project-actions button");
  await expect(buttons).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    const button = buttons.nth(index);
    await button.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await expect(page.locator(".case-modal-close")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(button).toBeFocused();
  }
});

test("axe covers the open mobile menu, dialog, and quote review", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".menu-button").click();
  await expectNoSeriousAxe(page);
  await page.keyboard.press("Escape");
  await page.goto("/#proyectos");
  await page.locator(".project-actions button").first().click();
  await expectNoSeriousAxe(page);
  await page.keyboard.press("Escape");
  await page.goto("/#contacto");
  await fillValidQuote(page);
  await page.locator(".form-submit").click();
  await expectNoSeriousAxe(page);
});

test("the five plan links preserve selection and the quote flow validates safely", async ({ page }) => {
  for (let index = 0; index < plans.length; index += 1) {
    await page.goto("/");
    await page.getByRole("link", { name: "Solicitar este plan", exact: true }).nth(index).click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.getByText(`Cotizando: ${plans[index]}`)).toBeVisible();
    await expect(page.locator("#contact-service")).not.toHaveValue("");
    await page.getByRole("button", { name: "Quitar plan" }).click();
    await expect(page.getByText(`Cotizando: ${plans[index]}`)).toHaveCount(0);
  }

  await page.goto("/#contacto");
  await page.locator(".form-submit").click();
  await expect(page.locator("#contact-name")).toBeFocused();
  await expect(page.locator(".form-error")).toBeVisible();
  await fillValidQuote(page);
  await page.locator(".form-submit").click();
  await expect(page.getByText("Todo listo para revisar.")).toBeFocused();
  await expect(page.getByText("ana@example.com")).toBeVisible();
  await expect(page.getByText("+57 305 776 4810")).toBeVisible();
  await page.evaluate(() => { window.open = ((url) => { document.documentElement.dataset.whatsappUrl = String(url); return null; }) as typeof window.open; });
  const whatsapp = page.locator(".review-actions .button").last();
  await whatsapp.dblclick();
  await expect(whatsapp).toBeDisabled();
  const url = await page.locator("html").getAttribute("data-whatsapp-url");
  expect(url).toContain("https://wa.me/573057376481?text=");
  expect(decodeURIComponent(url ?? "")).toContain("Proyecto con Ñ y emojis ✨");
});

test("footer Plans anchor, metadata, 404, and serious axe violations are covered", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Planes", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#planes$/);
  await expect(page.locator("#planes h2")).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://creator-forge-six.vercel.app");
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expectNoSeriousAxe(page);
  const externalProjects = page.locator('.project-actions a[target="_blank"]');
  await expect(externalProjects).toHaveCount(3);
  for (const link of await externalProjects.all()) await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  const response = await page.goto("/ruta-inexistente");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
