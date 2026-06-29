import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const base = 'http://localhost:5173'

const viewports = [
  { name: 'tablet-800', width: 800, height: 1024 },
  { name: 'mobile-400', width: 400, height: 812 },
]

const pages = [
  { path: '/', slug: 'home' },
  { path: '/meetings', slug: 'meetings' },
  { path: '/action-items', slug: 'action-items' },
]

await mkdir('screenshots/verify', { recursive: true })

const browser = await chromium.launch()

// Kanban board
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(`${base}/action-items`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Kanban' }).click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'screenshots/verify/kanban-board.png' })
  await page.close()
}

// Custom date filter on Meetings
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(`${base}/meetings`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Custom' }).click()
  await page.waitForTimeout(200)
  await page.screenshot({ path: 'screenshots/verify/meetings-custom-chip.png' })
  const dateInput = page.locator('input[type="date"]')
  await dateInput.fill('2026-06-30')
  await page.waitForTimeout(200)
  await page.screenshot({ path: 'screenshots/verify/meetings-custom-date-filtered.png' })
  await page.close()
}

// Home data sync check - same meeting attendee count
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  await page.screenshot({ path: 'screenshots/verify/home-upcoming-sync.png' })
  await page.goto(`${base}/meetings`, { waitUntil: 'networkidle' })
  await page.screenshot({ path: 'screenshots/verify/meetings-list-sync.png' })
  await page.close()
}

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await context.newPage()
  for (const { path, slug } of pages) {
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
    await page.screenshot({ path: `screenshots/verify/${vp.name}-${slug}.png` })
  }
  await context.close()
}

await browser.close()
console.log('Verification screenshots saved to screenshots/verify/')

// Fix confirmations: collapsed sidebar badge + Kanban scroll clearance
{
  const browser2 = await chromium.launch()
  const page = await browser2.newPage({ viewport: { width: 800, height: 720 } })
  await page.goto(`${base}/action-items`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'screenshots/verify/fix-sidebar-badge-collapsed.png' })
  await page.getByRole('button', { name: 'Kanban' }).click()
  await page.waitForTimeout(300)
  await page.evaluate(() => {
    const main = document.querySelector('main')
    if (main) main.scrollTo({ top: main.scrollHeight, behavior: 'instant' })
  })
  await page.waitForTimeout(200)
  await page.screenshot({ path: 'screenshots/verify/fix-kanban-companion-clearance.png' })
  await browser2.close()
  console.log('Fix confirmation screenshots saved.')
}
