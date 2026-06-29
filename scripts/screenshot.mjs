import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const widths = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-375', width: 375, height: 812 },
]

const pages = ['/', '/meetings', '/action-items']

await mkdir('screenshots/qa', { recursive: true })

const browser = await chromium.launch()
for (const vp of widths) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  })
  const page = await context.newPage()
  for (const path of pages) {
    await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' })
    const slug = path === '/' ? 'home' : path.slice(1)
    await page.screenshot({
      path: `screenshots/qa/${vp.name}-${slug}.png`,
      fullPage: false,
    })
  }
  await context.close()
}
await browser.close()
console.log('Screenshots saved to screenshots/qa/')
