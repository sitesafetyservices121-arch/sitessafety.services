
import { test, expect } from '@playwright/test';

const pages = [
  '/admin/social-media',
  '/admin/pictures',
  '/admin/payments',
  '/admin',
  '/safety-management-system/signup',
  '/account',
  '/signup',
  '/login',
  '/experience',
  '/contact',
  '/',
  '/payment-cancelled',
  '/payment-success',
  '/terms',
  '/services',
  '/safety-management-system',
  '/rent-a-safety-officer',
  '/privacy',
  '/print-ready-safety-files',
  '/popia',
  '/e-safety-file',
  '/about',
];

for (const pageUrl of pages) {
  test(`should check for broken links on ${pageUrl}`, async ({ page }) => {
    await page.goto(pageUrl);

    const links = await page.locator('a').evaluateAll((links) => links.map((link) => link.href));

    for (const link of links) {
      if (!link || link.startsWith('mailto:') || link.startsWith('tel:')) {
        continue;
      }

      const response = await page.request.get(link);
      expect(response.status()).toBeLessThan(400);
    }
  });
}
