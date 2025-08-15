// calendarDates.spec.js
import { test, expect } from '@playwright/test';
import { CalendarDatesPage } from '../pages/CalendarDatesPage';

test.describe('Calendar Dates Page Tests', () => {
  let calendarDatesPage;

  test.beforeEach(async ({ page }) => {
    calendarDatesPage = new CalendarDatesPage(page);
    await calendarDatesPage.navigate();
  });

  test('should set number of dates and date range', async () => {
    await calendarDatesPage.setNumberOfDates(4);
    await calendarDatesPage.setDateRange(5, 'January', 2024, 25, 'November', 2025);
    
    const dates = await calendarDatesPage.getRandomDates();
    
    expect(dates.length).toBe(4);
    
    const startDate = new Date('2024-01-05');
    const endDate = new Date('2025-11-25');
    
    for (const dateString of dates) {
      const returnedDate = new Date(dateString);
      expect(returnedDate >= startDate && returnedDate <= endDate).toBe(true);
    }
  });
});
