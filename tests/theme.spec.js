import {test, expect} from '@playwright/test';

test.describe('Theme Switching Functionality', () => {
  test('should switch between light and dark themes', async ({page}) => {
    // Navigate to the page
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('html', {state: 'visible'});
    
    // Check initial theme (could be either light or dark based on system preference)
    const initialIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    // Find and click the theme toggle button (assuming there's a theme toggle button with an ID)
    // You might need to adjust this selector based on your actual implementation
    await page.click('#theme-toggle');
    
    // Check if the theme has changed
    const newIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(newIsDark).not.toBe(initialIsDark);
    
    // Toggle back to original theme
    await page.click('#theme-toggle');
    
    // Verify we're back to the initial theme
    const finalIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(finalIsDark).toBe(initialIsDark);
  });
  
  test('should persist theme preference after page reload', async ({page}) => {
    // Navigate to the page
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('html', {state: 'visible'});
    
    // Get initial theme state
    const initialIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    // Toggle the theme
    await page.click('#theme-toggle');
    
    // Verify theme changed
    const newIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(newIsDark).not.toBe(initialIsDark);
    
    // Reload the page
    await page.reload();
    
    // Wait for the page to load again
    await page.waitForSelector('html', {state: 'visible'});
    
    // Check if theme preference persisted
    const persistedIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(persistedIsDark).toBe(newIsDark);
  });
  
  test('should persist theme preference in a new browser session', async ({browser}) => {
    // Create a new context with storage state persistence
    const context = await browser.newContext({
      storageState: {
        cookies: [],
        origins: []
      }
    });
    const page = await context.newPage();
    
    // Navigate to the page
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('html', {state: 'visible'});
    
    // Get initial theme state
    const initialIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    // Toggle the theme
    await page.click('#theme-toggle');
    
    // Verify theme changed
    const newIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(newIsDark).not.toBe(initialIsDark);
    
    // Store the current theme state and localStorage value
    const expectedTheme = newIsDark;
    const themeValue = await page.evaluate(() => localStorage.getItem('isDarkMode'));
    
    // Save storage state to use in the next context
    const storageState = await context.storageState();
    
    // Close the context
    await context.close();
    
    // Create a new context with the saved storage state
    const newContext = await browser.newContext({
      storageState: storageState
    });
    const newPage = await newContext.newPage();
    
    // Navigate to the page again
    await newPage.goto('/');
    
    // Wait for the page to load
    await newPage.waitForSelector('html', {state: 'visible'});
    
    // Check if theme preference persisted across sessions
    const persistedIsDark = await newPage.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(persistedIsDark).toBe(expectedTheme);
    
    // Verify localStorage value was preserved
    const persistedThemeValue = await newPage.evaluate(() => 
      localStorage.getItem('isDarkMode')
    );
    expect(persistedThemeValue).toBe(themeValue);
    
    // Clean up
    await newContext.close();
  });
});
