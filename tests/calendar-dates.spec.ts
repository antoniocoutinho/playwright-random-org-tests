// calendarDates.spec.js
import { test, expect } from '@playwright/test';

test('should generate and verify random dates within a specified range', async ({ page }) => {
    // --- 1. Setup: Navigate to the URL
    await page.goto('https://www.random.org/calendar-dates/');
    
    // Accept cookies if prompted
    await page.getByRole('button', { name: 'Allow Selected' }).click();
    // On ‘Step 1 : The Dates’ , pick a total of 4 random dates. 
    await page.locator('input[name="num"]').fill('4');

    // In the dropdown, select the date between the 5th of January 2024, and the 25th of November 2025.

    await page.locator('select[name="start_day"]').click();
    await page.type('select[name="start_day"]', '5');
    await page.locator('select[name="start_day"]').press('Enter');

    await page.locator('select[name="start_month"]').click();
    await page.type('select[name="start_month"]', 'january');
    await page.locator('select[name="start_month"]').press('Enter');

    await page.locator('select[name="start_year"]').click();
    await page.type('select[name="start_year"]', '2024');
    await page.locator('select[name="start_year"]').press('Enter');

    await page.locator('select[name="end_day"]').click();
    await page.type('select[name="end_day"]', '25');
    await page.locator('select[name="end_day"]').press('Enter');

    await page.locator('select[name="end_month"]').click();
    await page.type('select[name="end_month"]', 'november');
    await page.locator('select[name="end_month"]').press('Enter');

    await page.locator('select[name="end_year"]').click();
    await page.type('select[name="end_year"]', '2025');
    await page.locator('select[name="end_year"]').press('Enter');

    await page.locator('input[value="Get Dates"]').click();

    // Extract dates from <p> elements with one that contains style attribute
    const html = await page.locator('p[style]').innerHTML();
    const dates = html
        .split('<br>')
        .map(line => line.replace(/<[^>]+>/g, '').trim())
        .filter(line => line.length > 0);

    // Assert that the result returned 4 dates. 
    await expect(page.getByText('Here are your 4 calendar dates:')).toBeVisible();
    await expect(dates.length).toBe(4);

    
    const startDate = new Date('2024-01-05');
    const endDate = new Date('2025-11-25');
    for (const dateString of dates) {
        const returnedDate = new Date(dateString);
        await expect(returnedDate >= startDate && returnedDate <= endDate).toBe(true);
    }
    
});