import dotenv from 'dotenv'
dotenv.config()
import { zalandoBot } from './Bot/Zalando/zalandoBot'
import { Cluster } from 'puppeteer-cluster'
;(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: 3
  })

  cluster.queue(
    {
      email: process.env.EMAIL1,
      password: process.env.PASSWORD1,
      size: [44, 43, 42],
      url:
        'https://www.zalando.nl/vans-old-skool-sneakers-laag-va215b000-q12.html',
      buy: false
    },
    zalandoBot
  )

  cluster.queue(
    {
      email: process.env.EMAIL2,
      password: process.env.PASSWORD1,
      size: [44, 43, 42],
      url:
        'https://www.zalando.nl/vans-old-skool-sneakers-laag-va215b000-q12.html',
      buy: false
    },
    zalandoBot
  )

  cluster.queue(
    {
      email: process.env.EMAIL3,
      password: process.env.PASSWORD1,
      size: [44, 43, 42],
      url:
        'https://www.zalando.nl/vans-old-skool-sneakers-laag-va215b000-q12.html',
      buy: false
    },
    zalandoBot
  )

  await cluster.idle()
  await cluster.close()
})()
