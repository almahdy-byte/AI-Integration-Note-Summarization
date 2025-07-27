import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { AppError } from "../error/appError.js";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Summarize Note Function
export const summarize = async (text) => {
  try {
    const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

    const prompt = `Please summarize the following note in one short paragraph:\n\n"${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return  summary ;
  } catch (err) {
    console.error("Gemini summarization error:", err);
    throw new AppError(err.message || "Failed to summarize note using Gemini" , StatusCodes.BAD_GATEWAY);
  }
};
