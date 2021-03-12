"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBot = void 0;
var puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
var puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
var preparePageForTest_1 = require("./preparePageForTest");
var puppeteer_page_proxy_1 = __importDefault(require("puppeteer-page-proxy"));
var getProxy_1 = require("./getProxy");
var Loggers_1 = require("./Loggers/Loggers");
var pluginStealth = puppeteer_extra_plugin_stealth_1.default();
// eslint-disable-next-line @typescript-eslint/no-empty-function
pluginStealth.onBrowser = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
puppeteer_extra_1.default.use(pluginStealth);
puppeteer_extra_1.default.defaultArgs();
exports.sendBot = function (_a) {
    var email = _a.email, password = _a.password, size = _a.size, url = _a.url, buy = _a.buy;
    return __awaiter(void 0, void 0, void 0, function () {
        var browser, page, button, isVisible, e_1, errorPage, sizeButtonId, response, date, time, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, puppeteer_extra_1.default.launch({
                        ignoreHTTPSErrors: true,
                        headless: false
                    })
                    // New page
                ];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _b.sent();
                    return [4 /*yield*/, page.setRequestInterception(true)];
                case 3:
                    _b.sent();
                    page.on('request', function (request) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, puppeteer_page_proxy_1.default(request, getProxy_1.getProxy())];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, preparePageForTest_1.preparePageForTests(page)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.setViewport({ width: 1024, height: 800 })
                        // Go to website
                    ];
                case 5:
                    _b.sent();
                    // Go to website
                    return [4 /*yield*/, page.goto(url)];
                case 6:
                    // Go to website
                    _b.sent();
                    page.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for page to finish loading
                    Loggers_1.logger.log({
                        level: 'info',
                        message: "Loaded page for " + email + " "
                    });
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 58, , 60]);
                    button = false;
                    _b.label = 8;
                case 8:
                    if (!!button) return [3 /*break*/, 13];
                    _b.label = 9;
                case 9:
                    _b.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, page.waitForSelector('button[aria-label="Bestel nu!"].DJxzzA.u9KIT8.NB8Ll4.vk5JMf.ZkIJC-.Vn-7c-.FCIprz.heWLCX.RzUmIb.LyRfpJ.Md_Vex.NN8L-8.GTG2H9.MfX1a0.WCjo-q.EKabf7.aX2-iv.r9BRio.E6Km4r.mo6ZnF', {
                            timeout: 400
                        })];
                case 10:
                    isVisible = _b.sent();
                    if (isVisible) {
                        button = true;
                    }
                    return [3 /*break*/, 12];
                case 11:
                    e_1 = _b.sent();
                    Loggers_1.logger.log({
                        level: 'debug',
                        message: "Bot for " + email + " is waiting for shoe to be available"
                    });
                    page.reload({ waitUntil: 'domcontentloaded' });
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 8];
                case 13: return [4 /*yield*/, page.evaluate(function () {
                        var errorPageContainer = document.querySelector('.z-500-error-page');
                        if (errorPageContainer) {
                            Loggers_1.logger.log({
                                level: 'error',
                                message: "Bot for " + email + " encountered an error page"
                            });
                            return true;
                        }
                        return false;
                    })];
                case 14:
                    errorPage = _b.sent();
                    if (!errorPage) return [3 /*break*/, 16];
                    exports.sendBot({
                        email: email,
                        password: password,
                        size: [size[0] - 3, size[1] - 3, size[2] - 3],
                        url: url,
                        buy: buy
                    });
                    return [4 /*yield*/, browser.close()];
                case 15:
                    _b.sent();
                    _b.label = 16;
                case 16:
                    Loggers_1.logger.log({
                        level: 'debug',
                        message: "Shoe is available for " + email
                    });
                    // Accept cookies banner
                    return [4 /*yield*/, page.waitForSelector('#uc-btn-accept-banner')];
                case 17:
                    // Accept cookies banner
                    _b.sent();
                    return [4 /*yield*/, page.click('#uc-btn-accept-banner')];
                case 18:
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(200)
                        // Click on size button
                    ];
                case 19:
                    _b.sent();
                    // Click on size button
                    return [4 /*yield*/, page.click('.kMvGAR._6-WsK3.Md_Vex.Nk_Omi._MmCDa.to_CKO._0xLoFW.FCIprz.NN8L-8._7Cm1F9.ka2E9k.uMhVZi.FxZV-M.RzUmIb.LyRfpJ.heRAwu.K82if3.heWLCX.mo6ZnF')
                        // Wait for size form
                    ];
                case 20:
                    // Click on size button
                    _b.sent();
                    // Wait for size form
                    return [4 /*yield*/, page.waitForSelector('._0xLoFW.VuYQuj.fmEdHZ._78xIQ-.parent')];
                case 21:
                    // Wait for size form
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(200)
                        // SELECT SIZE
                        // Get correct sizeButtonId
                    ];
                case 22:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function (size) {
                            var sizeButton = '';
                            var sizeForm = document.querySelector('._0xLoFW.VuYQuj.fmEdHZ._78xIQ-.parent');
                            if (sizeForm) {
                                var sizes = Array.from(sizeForm.children);
                                sizes.forEach(function (child) {
                                    if (child.innerText.includes(size[0])) {
                                        var id = child.children[0].id;
                                        sizeButton = "#" + id;
                                    }
                                    else if (child.innerText.includes(size[1])) {
                                        var id = child.children[0].id;
                                        sizeButton = "#" + id;
                                    }
                                    else if (child.innerText.includes(size[2])) {
                                        var id = child.children[0].id;
                                        sizeButton = "#" + id;
                                    }
                                });
                            }
                            return sizeButton;
                        }, size)];
                case 23:
                    sizeButtonId = _b.sent();
                    return [4 /*yield*/, page.waitFor(200)
                        // Click on sizeButtonId
                    ];
                case 24:
                    _b.sent();
                    // Click on sizeButtonId
                    return [4 /*yield*/, page.evaluate(function (sizeButtonId) { return document.querySelector(sizeButtonId).click(); }, sizeButtonId)];
                case 25:
                    // Click on sizeButtonId
                    _b.sent();
                    Loggers_1.logger.log({
                        level: 'debug',
                        message: "Bot selected a size for " + email
                    });
                    return [4 /*yield*/, page.waitFor(200)
                        // Click on order
                    ];
                case 26:
                    _b.sent();
                    // Click on order
                    return [4 /*yield*/, page.click('.DJxzzA.u9KIT8.NB8Ll4.vk5JMf.ZkIJC-.Vn-7c-.FCIprz.heWLCX.RzUmIb.LyRfpJ.Md_Vex.NN8L-8.GTG2H9.MfX1a0.WCjo-q.EKabf7.aX2-iv.r9BRio.E6Km4r.mo6ZnF')
                        // Go to cart
                    ];
                case 27:
                    // Click on order
                    _b.sent();
                    // Go to cart
                    return [4 /*yield*/, page.goto('https://www.zalando.nl/cart')];
                case 28:
                    // Go to cart
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(200)];
                case 29:
                    _b.sent();
                    page
                        .waitForSelector('.z-coast-cart__cart__empty-cart-tiles.z-coast-cart__cart__empty-cart-tiles__spacing', {
                        timeout: 300
                    })
                        .then(function (value) {
                        if (value) {
                            Loggers_1.logger.log({
                                level: 'error',
                                message: "Selected size is not available for " + email + ". Bot will go back to find another size"
                            });
                            browser.close();
                            exports.sendBot({
                                email: email,
                                password: password,
                                size: [size[0] - 3, size[1] - 3, size[2] - 3],
                                url: url,
                                buy: buy
                            });
                        }
                    })
                        .catch(function () {
                        Loggers_1.logger.log({
                            level: 'debug',
                            message: "Empty cart page is not visible " + email
                        });
                    });
                    return [4 /*yield*/, page.waitForSelector('.z-1-button.z-coast-base-primary-accessible.z-coast-base__totals-tile__button-checkout.z-1-button--primary.z-1-button--button')];
                case 30:
                    _b.sent();
                    Loggers_1.logger.log({
                        level: 'debug',
                        message: "Selected is available for " + email
                    });
                    return [4 /*yield*/, page.waitFor(300)
                        // Go to payment
                    ];
                case 31:
                    _b.sent();
                    // Go to payment
                    return [4 /*yield*/, page.click('.z-1-button.z-coast-base-primary-accessible.z-coast-base__totals-tile__button-checkout.z-1-button--primary.z-1-button--button')];
                case 32:
                    // Go to payment
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(300)];
                case 33:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector('input')];
                case 34:
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(300)
                        // 	// Username
                    ];
                case 35:
                    _b.sent();
                    // 	// Username
                    return [4 /*yield*/, page.focus('input[type=email]')];
                case 36:
                    // 	// Username
                    _b.sent();
                    return [4 /*yield*/, page.keyboard.type(email)];
                case 37:
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(300)
                        // Passwor
                    ];
                case 38:
                    _b.sent();
                    // Passwor
                    return [4 /*yield*/, page.focus('input[type=password]')];
                case 39:
                    // Passwor
                    _b.sent();
                    return [4 /*yield*/, page.keyboard.type(password)];
                case 40:
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(300)];
                case 41:
                    _b.sent();
                    return [4 /*yield*/, page.click('.pOsfC-.asbbQN.ccsMLn.f2LeUT.YJjAXl._4Dn_hw.rk5xjV.iRTWcu.WyRDll.Lr35FC.mOWcYW.Pih6jB.SFWSLQ.KyqyyN.bpoNDV.MJ3QEv.VWqWjl.BDqWpW.tnhKLw._74XCr9.-JVh7M.xiUeUV.b0zuQ5.P477Zt.DuK5bw._9DY9kN')];
                case 42:
                    _b.sent();
                    return [4 /*yield*/, page.waitForResponse('https://www.zalando.nl/api/reef/login')];
                case 43:
                    response = _b.sent();
                    if (!(response.status() === 403)) return [3 /*break*/, 45];
                    Loggers_1.logger.log({
                        level: 'error',
                        message: "Bot couldn't log in for " + email + ". Bot will start process again"
                    });
                    return [4 /*yield*/, browser.close()];
                case 44:
                    _b.sent();
                    exports.sendBot({ email: email, password: password, size: size, url: url, buy: buy });
                    _b.label = 45;
                case 45:
                    Loggers_1.logger.log({
                        level: 'debug',
                        message: "Bot is logged " + email + " in!"
                    });
                    return [4 /*yield*/, page.waitForSelector('#delivery-destination-tab-0')];
                case 46:
                    _b.sent();
                    return [4 /*yield*/, page.click('#delivery-destination-tab-0')];
                case 47:
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(200)];
                case 48:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector('.z-coast-fjord_address_nextStep button')];
                case 49:
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(200)];
                case 50:
                    _b.sent();
                    return [4 /*yield*/, page.click('.z-coast-fjord_address_nextStep button')];
                case 51:
                    _b.sent();
                    return [4 /*yield*/, page.waitFor(200)];
                case 52:
                    _b.sent();
                    if (!buy) return [3 /*break*/, 57];
                    date = new Date();
                    return [4 /*yield*/, page.waitForSelector('button[data-id=z-coast-fjord-confirmation-buyNow-bottom]')];
                case 53:
                    _b.sent();
                    return [4 /*yield*/, page.click('button[data-id=z-coast-fjord-confirmation-buyNow-bottom]')];
                case 54:
                    _b.sent();
                    return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'networkidle0' })]; // Wait for page to finish loading
                case 55:
                    _b.sent(); // Wait for page to finish loading
                    return [4 /*yield*/, page.screenshot({
                            path: "screenshots/order-confirmation" + Math.floor(Math.random() * 255) + ".png",
                            fullPage: true
                        })];
                case 56:
                    _b.sent();
                    time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    Loggers_1.logger.log({
                        level: 'debug',
                        message: "Bot copped shoe at " + time + "!"
                    });
                    _b.label = 57;
                case 57: return [3 /*break*/, 60];
                case 58:
                    e_2 = _b.sent();
                    Loggers_1.logger.log({
                        level: 'error',
                        message: "Something went wrong for " + email + ".. Restarting proces"
                    });
                    return [4 /*yield*/, browser.close()];
                case 59:
                    _b.sent();
                    exports.sendBot({ email: email, password: password, size: size, url: url, buy: buy });
                    return [3 /*break*/, 60];
                case 60: return [2 /*return*/];
            }
        });
    });
};
