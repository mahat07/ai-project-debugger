import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
	path: path.resolve(__dirname, '../.env')
});

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
	throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-2.5-flash"
});

export async function analyzeCode(code: string) {

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

	} catch (error) {

		return "AI analysis failed.";
	}
}