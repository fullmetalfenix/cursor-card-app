import { test, expect } from './fixtures.js'

test.describe('Flashcards – review incorrect flow', () => {
  test('after marking some wrong, deck complete shows Review incorrect button', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Flip' }).click()
      if (i < 3) {
        await page.getByRole('button', { name: 'Got it Wrong' }).click()
      } else {
        await page.getByRole('button', { name: 'Got it Right!' }).click()
      }
    }
    await expect(page.getByRole('heading', { name: 'Deck complete!' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Review incorrect cards (3)' })).toBeVisible()
  })

  test('clicking Review incorrect shows only previously wrong cards', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Flip' }).click()
      if (i === 0 || i === 1) {
        await page.getByRole('button', { name: 'Got it Wrong' }).click()
      } else {
        await page.getByRole('button', { name: 'Got it Right!' }).click()
      }
    }
    await page.getByRole('button', { name: 'Review incorrect cards (2)' }).click()
    await expect(page.getByText(/Card 1 of 2/)).toBeVisible()
    await expect(page.getByText('(review)')).toBeVisible()
  })

  test('marking previously wrong card as right updates progress and completes review', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Flip' }).click()
      if (i === 0) {
        await page.getByRole('button', { name: 'Got it Wrong' }).click()
      } else {
        await page.getByRole('button', { name: 'Got it Right!' }).click()
      }
    }
    await page.getByRole('button', { name: 'Review incorrect cards (1)' }).click()
    await page.getByRole('button', { name: 'Flip' }).click()
    await page.getByRole('button', { name: 'Got it Right!' }).click()
    await expect(page.getByRole('heading', { name: 'Review complete!' })).toBeVisible()
    await expect(page.getByText(/You have answered all 1 card/)).toBeVisible()
  })

  test('after review complete, Back to deck returns to main deck', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
    for (let i = 0; i < 10; i++) {
      await page.getByRole('button', { name: 'Flip' }).click()
      if (i === 0) await page.getByRole('button', { name: 'Got it Wrong' }).click()
      else await page.getByRole('button', { name: 'Got it Right!' }).click()
    }
    await page.getByRole('button', { name: 'Review incorrect cards (1)' }).click()
    await page.getByRole('button', { name: 'Flip' }).click()
    await page.getByRole('button', { name: 'Got it Right!' }).click()
    await page.getByRole('button', { name: 'Back to deck' }).click()
    await expect(page.getByText(/Card \d+ of 10/)).toBeVisible()
  })
})
