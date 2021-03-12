"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({
            filename: 'progress.log',
            level: 'debug'
        }),
        new winston_1.default.transports.File({
            filename: 'copped.log',
            level: 'verbose'
        }),
        new winston_1.default.transports.File({ filename: 'combined.log', level: 'error' })
    ]
});
exports.logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.simple()
}));
