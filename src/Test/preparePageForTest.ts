import { Page } from 'puppeteer-extra/dist/puppeteer'
import UserAgent from 'random-useragent'

export async function preparePageForTests(page: Page): Promise<void> {
  const randomUserAgent = UserAgent.getRandom(function (ua) {
    return ua.browserName === 'Chrome' && ua.osName === 'Linux'
  })
    ?.replace('en-US', '')
    .replace('en-us', '')
  // Pass the User-Agent Test.

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
    // Overwrite the `plugins` property to use a custom getter.
    Object.defineProperty(navigator, 'plugins', {
      // This just needs to have `length > 0` for the current test,
      // but we could mock the plugins too if necessary.
      configurable: true,
      get: () => [1, 2, 3, 4, 5]
    })
  })

  // Pass the Chrome Test.
  await page.evaluateOnNewDocument(() => {
    // We can mock this in as much depth as we need for the test.
    window.navigator.chrome = {
      runtime: {}
      // etc.
    }
  })

  // Pass the Languages Test.
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en,nl;q=0.9'
  })

  await page.evaluateOnNewDocument(() => {
    // Overwrite the `plugins` property to use a custom getter.
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
