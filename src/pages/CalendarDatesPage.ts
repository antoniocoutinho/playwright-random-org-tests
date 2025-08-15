import { Page } from "@playwright/test";


export class CalendarDatesPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://www.random.org/calendar-dates/');
    await this.page.getByRole('button', { name: 'Allow Selected' }).click();
  }

  async setNumberOfDates(num: number) {
    await this.page.locator('input[name="num"]').fill(num.toString());
  }

  async setDateRange(startDay: number, startMonth: string, startYear: number, endDay: number, endMonth: string, endYear: number) {
    await this.page.locator('select[name="start_day"]').selectOption(startDay.toString());
    await this.page.locator('select[name="start_month"]').selectOption(startMonth);
    await this.page.locator('select[name="start_year"]').selectOption(startYear.toString());
    await this.page.locator('select[name="end_day"]').selectOption(endDay.toString());
    await this.page.locator('select[name="end_month"]').selectOption(endMonth);
    await this.page.locator('select[name="end_year"]').selectOption(endYear.toString());
  }

  async getRandomDates() {
    await this.page.locator('input[value="Get Dates"]').click();
    const html = await this.page.locator('p[style]').innerHTML();
    return html
      .split('<br>')
      .map(line => line.replace(/<[^>]+>/g, '').trim())
      .filter(line => line.length > 0);
  }
}