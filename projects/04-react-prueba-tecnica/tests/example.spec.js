// @ts-check
import { test, expect } from '@playwright/test'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  // Expect a title "to contain" a substring.
  await expect(textContent?.length).toBeGreaterThan(0) // el dato que muestra la app no puede estar vacío, tiene que tener al menos un carácter
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy() // la imagen que muestra la app no puede ser falsa, tiene que ser verdadera, es decir, tiene que existir una imagen con una url válida
})
