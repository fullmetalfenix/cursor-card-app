import { test as base } from '@playwright/test'

/**
 * Extended test: after goto, wait for the app shell (nav) to be visible
 * so the React app has finished rendering.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page)
    page.goto = async (url, options) => {
      const response = await originalGoto(url, { ...options, waitUntil: 'domcontentloaded' })
      await page.getByRole('link', { name: 'Flashcards' }).waitFor({ state: 'visible', timeout: 20000 })
      return response
    }
    await use(page)
  },
})

export { expect } from '@playwright/test'
