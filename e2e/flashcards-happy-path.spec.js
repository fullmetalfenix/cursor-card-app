import { test, expect } from './fixtures.js'

test.describe('Flashcards – happy path (all correct)', () => {
  test('user can flip card and see definition', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    const flipBtn = page.getByRole('button', { name: 'Flip' })
    await expect(flipBtn).toBeVisible()
    await flipBtn.click()
    await expect(page.getByRole('button', { name: 'Got it Right!' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Got it Wrong' })).toBeVisible()
  })

  test('progress updates when marking cards', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/Completed: \d+ of 10/)).toBeVisible()
    await page.getByRole('button', { name: 'Flip' }).click()
    await page.getByRole('button', { name: 'Got it Right!' }).click()
    await expect(page.getByText(/Completed: 1 of 10/)).toBeVisible()
  })

  test('completing all cards with "Got it Right!" shows deck complete without review button', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    const totalCards = 10
    for (let i = 0; i < totalCards; i++) {
      await page.getByRole('button', { name: 'Flip' }).click()
      await page.getByRole('button', { name: 'Got it Right!' }).click()
    }
    await expect(page.getByRole('heading', { name: 'Deck complete!' })).toBeVisible()
    await expect(page.getByText(/You have answered all 10 cards/)).toBeVisible()
    await expect(page.getByRole('button', { name: /Review incorrect cards/ })).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'Back to deck' })).toBeVisible()
  })

  test('Back to deck returns to first card', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Flip' }).click()
      await page.getByRole('button', { name: 'Got it Right!' }).click()
    }
    await page.getByRole('button', { name: 'Back to deck' }).click()
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    await expect(page.getByRole('button', { name: 'Flip' })).toBeVisible()
  })
})
