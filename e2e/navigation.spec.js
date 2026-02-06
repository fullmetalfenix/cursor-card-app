import { test, expect } from './fixtures.js'

test.describe('Navigation', () => {
  test('app loads with Flashcards as default route', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: 'Flashcard App' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Flashcards' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Statistics' })).toBeVisible()
  })

  test('navigating to Statistics updates URL and shows Statistics content', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Statistics' })).toBeVisible()
    await page.getByRole('link', { name: 'Statistics' }).click()
    await expect(page).toHaveURL('/statistics')
    await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible()
    await expect(page.getByText(/Flashcard and quiz statistics/)).toBeVisible()
  })

  test('navigating back to Flashcards from Statistics', async ({ page }) => {
    await page.goto('/statistics')
    await expect(page.getByRole('link', { name: 'Flashcards' })).toBeVisible()
    await page.getByRole('link', { name: 'Flashcards' }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
  })

  test('active nav link has underline style on current page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Flashcard App' })).toBeVisible()
    const flashcardsLink = page.getByRole('link', { name: 'Flashcards' })
    await expect(flashcardsLink).toHaveCSS('text-decoration', /underline/)
    await page.getByRole('link', { name: 'Statistics' }).click()
    await expect(page).toHaveURL('/statistics')
    const statisticsLink = page.getByRole('link', { name: 'Statistics' })
    await expect(statisticsLink).toHaveCSS('text-decoration', /underline/)
  })
})
