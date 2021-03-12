import puppeteer from 'puppeteer-extra'
import stealth from 'puppeteer-extra-plugin-stealth'
import { preparePageForTests } from '../Test/preparePageForTest'
import useProxy from 'puppeteer-page-proxy'
import { getProxy } from '../Proxy/getProxy'
import { logger } from '../Loggers/Loggers'
import { Page } from 'puppeteer-extra/dist/puppeteer'

const pluginStealth = stealth()
// eslint-disable-next-line @typescript-eslint/no-empty-function
pluginStealth.onBrowser = async () => {}
puppeteer.use(pluginStealth)
puppeteer.defaultArgs()

export interface Props {
  page: Page
  data: {
    email: string
    password: string
    size: [number, number, number]
    url: string
    buy: boolean
  }
}

export const zalandoBot = async ({ page, data }: Props): Promise<void> => {
  // Launch browser

  await page.setRequestInterception(true)
  page.on('request', async (request) => {
    await useProxy(request, getProxy())
  })

  await preparePageForTests(page)
  await page.setViewport({ width: 1024, height: 800 })

  // Go to website
  await page.goto(data.url)
  page.waitForNavigation({ waitUntil: 'networkidle0' }) // Wait for page to finish loading

  await page.screenshot({ path: `screen-one-${data.email}.png`, type: 'png' })

  logger.log({
    level: 'info',
    message: `Loaded page for ${data.email} `
  })

  try {
    await page.waitForSelector(
      'button[aria-label="Bestel nu!"].DJxzzA.u9KIT8.NB8Ll4.vk5JMf.ZkIJC-.Vn-7c-.FCIprz.heWLCX.RzUmIb.LyRfpJ.Md_Vex.NN8L-8.GTG2H9.MfX1a0.WCjo-q.EKabf7.aX2-iv.r9BRio.E6Km4r.mo6ZnF',
      {
        timeout: 0
      }
    )

    logger.log({
      level: 'info',
      message: `Shoe is available ${data.email} `
    })

    const errorPage = await page.evaluate(() => {
      const errorPageContainer = document.querySelector('.z-500-error-page')
      if (errorPageContainer) {
        logger.log({
          level: 'error',
          message: `Bot for ${data.email} encountered an error page`
        })
        return true
      }
      return false
    })

    if (errorPage) {
      throw new Error()
    }

    logger.log({
      level: 'debug',
      message: `Shoe is available for ${data.email}`
    })

    // Accept cookies banner
    await page.waitForSelector('#uc-btn-accept-banner')
    await page.click('#uc-btn-accept-banner')

    await page.waitFor(200)

    // Click on size button
    await page.click(
      '.kMvGAR._6-WsK3.Md_Vex.Nk_Omi._MmCDa.to_CKO._0xLoFW.FCIprz.NN8L-8._7Cm1F9.ka2E9k.uMhVZi.FxZV-M.RzUmIb.LyRfpJ.heRAwu.K82if3.heWLCX.mo6ZnF'
    )

    // Wait for size form
    await page.waitForSelector('._0xLoFW.VuYQuj.fmEdHZ._78xIQ-.parent')

    await page.waitFor(200)

    // SELECT SIZE
    // Get correct sizeButtonId
    const sizeButtonId = await page.evaluate((size) => {
      let sizeButton = ''
      const sizeForm = document.querySelector(
        '._0xLoFW.VuYQuj.fmEdHZ._78xIQ-.parent'
      )

      if (sizeForm) {
        const sizes = Array.from(sizeForm.children) as HTMLElement[]
        sizes.forEach((child) => {
          if (child.innerText.includes(size[0])) {
            const id = child.children[0].id
            sizeButton = `#${id}`
          } else if (child.innerText.includes(size[1])) {
            const id = child.children[0].id
            sizeButton = `#${id}`
          } else if (child.innerText.includes(size[2])) {
            const id = child.children[0].id
            sizeButton = `#${id}`
          }
        })
      }

      return sizeButton
    }, data.size)

    await page.waitFor(200)

    // Click on sizeButtonId
    await page.evaluate(
      (sizeButtonId) => document.querySelector(sizeButtonId).click(),
      sizeButtonId
    )

    logger.log({
      level: 'debug',
      message: `Bot selected a size for ${data.email}`
    })

    await page.waitFor(200)

    // Click on order
    await page.click(
      '.DJxzzA.u9KIT8.NB8Ll4.vk5JMf.ZkIJC-.Vn-7c-.FCIprz.heWLCX.RzUmIb.LyRfpJ.Md_Vex.NN8L-8.GTG2H9.MfX1a0.WCjo-q.EKabf7.aX2-iv.r9BRio.E6Km4r.mo6ZnF'
    )

    await page.screenshot({ path: `order-page-${data.email}.png`, type: 'png' })
    // Go to cart
    await page.goto('https://www.zalando.nl/cart')

    await page.waitFor(200)

    page
      .waitForSelector(
        '.z-coast-cart__cart__empty-cart-tiles.z-coast-cart__cart__empty-cart-tiles__spacing',
        {
          timeout: 300
        }
      )
      .then((value) => {
        if (value) {
          page.screenshot({ path: `empty-page-${data.email}.png`, type: 'png' })

          logger.log({
            level: 'error',
            message: `Selected size is not available for ${data.email}. Bot will go back to find another size`
          })
          throw new Error()
        }
      })
      .catch(() => {
        logger.log({
          level: 'debug',
          message: `Empty cart page is not visible ${data.email}`
        })
      })

    await page.waitForSelector(
      '.z-1-button.z-coast-base-primary-accessible.z-coast-base__totals-tile__button-checkout.z-1-button--primary.z-1-button--button'
    )

    logger.log({
      level: 'debug',
      message: `Selected is available for ${data.email}`
    })

    await page.waitFor(300)

    // Go to payment
    await page.click(
      '.z-1-button.z-coast-base-primary-accessible.z-coast-base__totals-tile__button-checkout.z-1-button--primary.z-1-button--button'
    )

    await page.screenshot({ path: `login-page-${data.email}.png`, type: 'png' })

    await page.waitFor(300)

    await page.waitForSelector('input')
    await page.waitFor(300)

    // 	// Username
    await page.focus('input[type=email]')
    await page.keyboard.type(data.email)
    await page.waitFor(300)

    // Passwor
    await page.focus('input[type=password]')
    await page.keyboard.type(data.password)

    await page.waitFor(300)

    await page.click(
      '.pOsfC-.asbbQN.ccsMLn.f2LeUT.YJjAXl._4Dn_hw.rk5xjV.iRTWcu.WyRDll.Lr35FC.mOWcYW.Pih6jB.SFWSLQ.KyqyyN.bpoNDV.MJ3QEv.VWqWjl.BDqWpW.tnhKLw._74XCr9.-JVh7M.xiUeUV.b0zuQ5.P477Zt.DuK5bw._9DY9kN'
    )

    const response = await page.waitForResponse(
      'https://www.zalando.nl/api/reef/login'
    )

    if (response.status() === 403) {
      logger.log({
        level: 'error',
        message: `Bot couldn't log in for ${data.email}. Bot will start process again`
      })

      throw new Error()
    }

    await page.waitForSelector('#delivery-destination-tab-0')
    await page.click('#delivery-destination-tab-0')
    await page.screenshot({
      path: `delivery-page-${data.email}.png`,
      type: 'png'
    })

    logger.log({
      level: 'debug',
      message: `Bot is logged ${data.email} in!`
    })

    await page.waitFor(200)

    await page.waitForSelector('.z-coast-fjord_address_nextStep button')

    await page.waitFor(200)
    await page.click('.z-coast-fjord_address_nextStep button')

    await page.waitFor(200)
    await page.screenshot({
      path: `address-page-${data.email}.png`,
      type: 'png'
    })

    if (data.buy) {
      const date = new Date()
      await page.waitForSelector(
        'button[data-id=z-coast-fjord-confirmation-buyNow-bottom]'
      )

      await page.click(
        'button[data-id=z-coast-fjord-confirmation-buyNow-bottom]'
      )

      await page.waitForNavigation({ waitUntil: 'networkidle0' }) // Wait for page to finish loading

      await page.screenshot({
        path: `screenshots/order-confirmation${Math.floor(
          Math.random() * 255
        )}.png`,
        fullPage: true
      })

      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

      logger.log({
        level: 'debug',
        message: `Bot copped shoe at ${time}!`
      })
    }
  } catch (e) {
    logger.log({
      level: 'error',
      message: `Something went wrong for ${data.email}.. Restarting proces`
    })
  }
}
