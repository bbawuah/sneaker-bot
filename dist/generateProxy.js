"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProxy = void 0;
var request_1 = __importDefault(require("request"));
var cheerio_1 = __importDefault(require("cheerio"));
var ip_addresses = [];
var port_numbers = [];
function generateProxy() {
    request_1.default('https://sslproxies.org/', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $_1 = cheerio_1.default.load(html);
            $_1('td:nth-child(1)').each(function (index, value) {
                ip_addresses[index] = $_1(this).text();
            });
            $_1('td:nth-child(2)').each(function (index, value) {
                port_numbers[index] = $_1(this).text();
            });
        }
        else {
            console.log('Error loading proxy, please try again');
        }
        ip_addresses.join(', ');
        port_numbers.join(', ');
        var random_number = Math.floor(Math.random() * 100);
        console.log(ip_addresses[random_number]);
        console.log(port_numbers[random_number]);
        var proxy = "http://" + ip_addresses[random_number] + ":" + port_numbers[random_number];
        return proxy;
    });
}
exports.generateProxy = generateProxy;
