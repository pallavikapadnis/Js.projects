const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000, // 60 seconds per test
  retries: 2, // Retry failed tests up to 2 times
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        baseURL: 'https://google.com', // Example base URL
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: true,
      },
    },
  ],
  shard: { total: 2, current: 1 }, // Parallel execution
  use: {
    trace: 'on-first-retry', // Enable tracing on first retry
  },
  reporter: [['html', { open: 'never' }], ['json', { outputFile: 'test-results.json' }]],
});
const { test, expect } = require('@playwright/test');

test.describe('Home Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Feed Loading', async ({ page }) => {
    await expect(page.locator('.feed-item')).toHaveCount(10);
  });

  test('Search Functionality', async ({ page }) => {
    await page.fill('input[name="search"]', 'testuser');
    await page.click('button.search-button');
    await expect(page.locator('.user-result')).toBeVisible();
  });

  test('Story Viewing', async ({ page }) => {
    await page.click('.story-item');
    await expect(page.locator('.story-view')).toBeVisible();
  });

  test('Notifications', async ({ page }) => {
    await page.click('.notifications-icon');
    await expect(page.locator('.notification-item')).toBeVisible();
  });

  test('Direct Messaging', async ({ page }) => {
    await page.click('.message-icon');
    await expect(page).toHaveURL(/.*messages.*/);
    await expect(page.locator('.message-thread')).toBeVisible();
  });
});
const { test, expect } = require('@playwright/test');

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Valid Login', async ({ page }) => {
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  });

  test('Invalid Login', async ({ page }) => {
    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.error')).toHaveText('Invalid credentials');
  });

  test('Two-Factor Authentication', async ({ page }) => {
    await page.fill('input[name="username"]', '2fauser');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="2fa-code"]')).toBeVisible();
  });

  test('Password Reset', async ({ page }) => {
    await page.click('text="Forgot password?"');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('.reset-success')).toHaveText('Check your email');
  });

  test('Remember Me', async ({ page }) => {
    await page.check('input[name="remember"]');
    await page.click('button[type="submit"]');
    await expect(page.locator('input[name="remember"]')).toBeChecked();
  });
});
const { test, expect } = require('@playwright/test');

test.describe('Profile Page Tests', () => {

  test.use({ storageState: 'fixtures/session.json' }); // Fixture for logged-in state

  test.beforeEach(async ({ page }) => {
    await page.goto('/profile');
  });

  test('Update Profile Information', async ({ page }) => {
    await page.fill('input[name="fullname"]', 'New Name');
    await page.click('button.save-button');
    await expect(page.locator('.profile-name')).toHaveText('New Name');
  });

  test('Upload Profile Picture', async ({ page }) => {
    const filePath = 'path/to/profile-pic.jpg';
    await page.setInputFiles('input[type="file"]', filePath);
    await page.click('button.upload-button');
    await expect(page.locator('.profile-pic')).toHaveAttribute('src', /profile-pic.jpg/);
  });

  test('Update Bio', async ({ page }) => {
    await page.fill('textarea[name="bio"]', 'This is my new bio');
    await page.click('button.save-bio');
    await expect(page.locator('.bio')).toHaveText('This is my new bio');
  });

  test('View Followers', async ({ page }) => {
    await page.click('text="Followers"');
    await expect(page.locator('.follower-item')).toHaveCount(50);
  });

  test('Access Settings', async ({ page }) => {
    await page.click('text="Settings"');
    await expect(page).toHaveURL('/settings');
  });
});
const { mergeHTMLReports } = require('playwright-merge-reports');
mergeHTMLReports([
  'test-results-1',
  'test-results-2',
], {
  outputFolder: 'merged-reports',
});
