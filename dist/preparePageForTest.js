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
exports.preparePageForTests = void 0;
var random_useragent_1 = __importDefault(require("random-useragent"));
function preparePageForTests(page) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var randomUserAgent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    randomUserAgent = (_a = random_useragent_1.default.getRandom(function (ua) {
                        return ua.browserName === 'Chrome' && ua.osName === 'Linux';
                    })) === null || _a === void 0 ? void 0 : _a.replace('en-US', '').replace('en-us', '');
                    if (!randomUserAgent) return [3 /*break*/, 2];
                    if (/HeadlessChrome/.test(randomUserAgent)) {
                        console.log('failed user agent test');
                    }
                    else {
                        console.log('passed user agent test');
                    }
                    return [4 /*yield*/, page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2: 
                // Pass the Plugins Length Test.
                return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                        // Overwrite the `plugins` property to use a custom getter.
                        Object.defineProperty(navigator, 'plugins', {
                            // This just needs to have `length > 0` for the current test,
                            // but we could mock the plugins too if necessary.
                            configurable: true,
                            get: function () { return [1, 2, 3, 4, 5]; }
                        });
                    })
                    // Pass the Chrome Test.
                ];
                case 3:
                    // Pass the Plugins Length Test.
                    _b.sent();
                    // Pass the Chrome Test.
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            // We can mock this in as much depth as we need for the test.
                            window.navigator.chrome = {
                                runtime: {}
                                // etc.
                            };
                        })
                        // Pass the Languages Test.
                    ];
                case 4:
                    // Pass the Chrome Test.
                    _b.sent();
                    // Pass the Languages Test.
                    return [4 /*yield*/, page.setExtraHTTPHeaders({
                            'Accept-Language': 'en,nl;q=0.9'
                        })];
                case 5:
                    // Pass the Languages Test.
                    _b.sent();
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            // Overwrite the `plugins` property to use a custom getter.
                            Object.defineProperty(navigator, 'language', {
                                configurable: true,
                                get: function () { return 'en'; }
                            });
                            Object.defineProperty(navigator, 'languages', {
                                get: function () {
                                    return ['en', 'nl'];
                                }
                            });
                        })];
                case 6:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.preparePageForTests = preparePageForTests;
