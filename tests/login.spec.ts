
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should allow a user to sign up and log in', async ({ page }) => {
    // Go to the signup page
    await page.goto('/signup');

    // Fill in the signup form
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';
    await page.fill('#email', email);
    await page.fill('#password', password);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation to the login page (or wherever the app redirects after signup)
    await page.waitForURL('/login');

    // Now, log in with the new credentials
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');

    // Wait for successful login and redirection to the account page
    await page.waitForURL('/account');

    // Check if the account page is displayed
    expect(page.url()).toBe('http://localhost:3000/account');
  });

  test('should show an error for invalid login credentials', async ({ page }) => {
    // Go to the login page
    await page.goto('/login');

    // Fill in invalid credentials
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpassword');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for the error message
    const errorMessage = await page.locator('.text-destructive');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('auth/invalid-credential');
  });
});
