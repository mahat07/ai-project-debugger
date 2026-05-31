"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeCode = analyzeCode;
const generative_ai_1 = require("@google/generative-ai");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});
const apiKey = process.env.GEMINI_API_KEY;
console.log(process.env.GEMINI_API_KEY);
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});
async function analyzeCode(code) {
    const prompt = `
	You are an expert software debugger.

	Analyze this code for:
	- Bugs
	- Performance issues
	- Security problems
	- Bad coding practices

	Rules:
	- Keep response short and concise
	- Use bullet points
	- Maximum 6 points
	- Avoid long explanations
	- If no issue found say "No major issues found
	- Focus on critical issues only"

	Code:
	${code}
	`;
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    }
    catch (error) {
        return "AI analysis failed.";
    }
}
//# sourceMappingURL=geminiService.js.map