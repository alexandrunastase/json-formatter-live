import {test, expect} from '@playwright/test';

test.describe('Theme Switching Functionality', () => {
  test('should switch between light and dark themes', async ({page}) => {
    await page.goto('/');
    await page.waitForSelector('html', {state: 'visible'});
    
    // Check initial theme (could be light or dark based on system preference)
    const initialIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    await page.click('#theme-toggle');
    
    const newIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(newIsDark).not.toBe(initialIsDark);
    
    await page.click('#theme-toggle');
    
    const finalIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(finalIsDark).toBe(initialIsDark);
  });
  
  test('should persist theme preference after page reload', async ({page}) => {
    await page.goto('/');
    await page.waitForSelector('html', {state: 'visible'});
    
    const initialIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    await page.click('#theme-toggle');
    
    const newIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(newIsDark).not.toBe(initialIsDark);
    
    await page.reload();
    
    await page.waitForSelector('html', {state: 'visible'});
    
    const persistedIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(persistedIsDark).toBe(newIsDark);
  });
  
  test('should persist theme preference in a new browser session', async ({browser}) => {
    const context = await browser.newContext({
      storageState: {
        cookies: [],
        origins: []
      }
    });
    const page = await context.newPage();
    
    await page.goto('/');
    await page.waitForSelector('html', {state: 'visible'});
    
    const initialIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    await page.click('#theme-toggle');
    
    const newIsDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(newIsDark).not.toBe(initialIsDark);
    
    const expectedTheme = newIsDark;
    const themeValue = await page.evaluate(() => localStorage.getItem('isDarkMode'));
    
    const storageState = await context.storageState();
    
    await context.close();
    
    const newContext = await browser.newContext({
      storageState: storageState
    });
    const newPage = await newContext.newPage();
    
    await newPage.goto('/');
    
    await newPage.waitForSelector('html', {state: 'visible'});
    
    const persistedIsDark = await newPage.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(persistedIsDark).toBe(expectedTheme);
    
    const persistedThemeValue = await newPage.evaluate(() => 
      localStorage.getItem('isDarkMode')
    );
    expect(persistedThemeValue).toBe(themeValue);
    
    await newContext.close();
  });
});
