"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
var zod_1 = require("zod");
exports.AuthValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }),
});
