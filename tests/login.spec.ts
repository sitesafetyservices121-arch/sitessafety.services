
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

    // Submit the form and wait for the hard navigation to complete
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"]'),
    ]);

    // After signup and session creation, we should be on the account page
    await page.waitForURL('/account');

    // Check if the account page is displayed
    expect(page.url()).toContain('/account');

    // As an extra check, verify some content on the account page
    await expect(page.locator(`text=${email}`)).toBeVisible();
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
    await expect(errorMessage).toContainText('Invalid email or password');
  });

  test('should show an error for signing up with an existing email', async ({ page }) => {
    // First, sign up a user
    await page.goto('/signup');
    const email = `existing_user_${Date.now()}@example.com`;
    const password = 'password123';
    await page.fill('#email', email);
    await page.fill('#password', password);
    
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        page.click('button[type="submit"]'),
    ]);
    
    // We should be on the account page, first log out before trying to sign up again
    await page.goto('/account');
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        page.click('button:has-text("Log Out")'),
    ]);
    await page.waitForURL('/');


    // Now, try to sign up again with the same email
    await page.goto('/signup');
    await page.fill('#email', email);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');

    // Check for the error message indicating email already in use
    const errorMessage = await page.locator('.text-destructive');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('This email address is already in use.');
  });

  test('should initiate Google sign-in flow from signup page', async ({ page }) => {
    await page.goto('/signup');
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('button:has-text("Sign up with Google")'),
    ]);
    // Verify that the popup URL is a Google authentication URL
    expect(popup.url()).toMatch(/accounts\.google\.com/);
    await popup.close();
  });

  test('should initiate Google sign-in flow from login page', async ({ page }) => {
    await page.goto('/login');
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('button:has-text("Sign in with Google")'),
    ]);
    // Verify that the popup URL is a Google authentication URL
    expect(popup.url()).toMatch(/accounts\.google\.com/);
    await popup.close();
  });
});
