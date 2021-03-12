import request from 'request'
import cheerio from 'cheerio'

const ip_addresses: string[] = []
const port_numbers: string[] = []

export async function getProxy(): Promise<string> {
  await request('https://sslproxies.org/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      $('td:nth-child(1)').each(function (index, value) {
        ip_addresses[index] = $(value).text()
      })

      $('td:nth-child(2)').each(function (index, value) {
        port_numbers[index] = $(value).text()
      })
    } else {
      console.log('Error loading proxy, please try again')
    }

    ip_addresses.join(', ')
    port_numbers.join(', ')
  })

  const random_number = Math.floor(Math.random() * 100)
  const proxyUrl = `http://${ip_addresses[random_number]}:${port_numbers[random_number]}`
  return proxyUrl
}
