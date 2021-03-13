import { Page } from 'puppeteer-extra/dist/puppeteer'
import UserAgent from 'random-useragent'

export async function preparePageForTests(page: Page): Promise<void> {
  // Random userAgen is deprecated. It should be removed in the future
  const randomUserAgent = UserAgent.getRandom(function (ua) {
    return ua.browserName === 'Chrome' && ua.osName === 'Linux'
  })
    ?.replace('en-US', '')
    .replace('en-us', '')

  if (randomUserAgent) {
    if (/HeadlessChrome/.test(randomUserAgent)) {
      console.log('failed user agent test')
    } else {
      console.log('passed user agent test')
    }
    await page.setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    )
  }

  // Pass the Plugins Length Test.
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'plugins', {
      configurable: true,
      get: () => [1, 2, 3, 4, 5]
    })
  })

  // Pass the Languages Test.
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en,nl;q=0.9'
  })

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      get: () => 'en'
    })

    Object.defineProperty(navigator, 'languages', {
      get: function () {
        return ['en', 'nl']
      }
    })
  })
}
