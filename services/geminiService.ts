
import { GoogleGenAI, Type } from "@google/genai";
import { TOSResult } from '../types';

const bloomsDistributionSchema = {
  type: Type.OBJECT,
  properties: {
    remembering: { type: Type.INTEGER, description: "Number of items at the 'Remembering' level." },
    understanding: { type: Type.INTEGER, description: "Number of items at the 'Understanding' level." },
    applying: { type: Type.INTEGER, description: "Number of items at the 'Applying' level." },
    analyzing: { type: Type.INTEGER, description: "Number of items at the 'Analyzing' level." },
    evaluating: { type: Type.INTEGER, description: "Number of items at the 'Evaluating' level." },
    creating: { type: Type.INTEGER, description: "Number of items at the 'Creating' level." },
  },
   required: ["remembering", "understanding", "applying", "analyzing", "evaluating", "creating"],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    tableRows: {
      type: Type.ARRAY,
      description: "An array of objects, where each object represents a row in the Table of Specifications, grouped by topic.",
      items: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING, description: "The main topic or subject area from the syllabus." },
          intendedOutcomes: { type: Type.STRING, description: "A summary of the Intended Learning Outcomes (ILOs) related to this topic." },
          totalItems: { type: Type.INTEGER, description: "The total count of exam questions for this topic." },
          numberOfHours: { type: Type.INTEGER, description: "An estimated number of instruction hours for this topic based on the syllabus. Make a reasonable estimate if not specified." },
          bloomsDistribution: bloomsDistributionSchema,
          itemPlacement: { type: Type.STRING, description: "A comma-separated string of the question numbers corresponding to this topic (e.g., '1, 5, 10')." },
          percentage: { type: Type.NUMBER, description: "The percentage of the total exam items that this topic represents." },
        },
        required: ["topic", "intendedOutcomes", "totalItems", "numberOfHours", "bloomsDistribution", "itemPlacement", "percentage"],
      },
    },
    totals: {
      type: Type.OBJECT,
      description: "An object containing the summation of key columns.",
      properties: {
        totalItems: { type: Type.INTEGER, description: "The sum of 'totalItems' from all rows." },
        numberOfHours: { type: Type.INTEGER, description: "The sum of 'numberOfHours' from all rows." },
        bloomsDistribution: bloomsDistributionSchema,
        percentage: { type: Type.NUMBER, description: "The total percentage, which should sum to 100." },
      },
      required: ["totalItems", "numberOfHours", "bloomsDistribution", "percentage"],
    },
  },
  required: ["tableRows", "totals"],
};

export const analyzeSyllabusAndExam = async (apiKey: string, syllabus: string, exam: string): Promise<TOSResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide a valid API key.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    As an expert in educational assessment and curriculum design, your task is to create a Table of Specifications (TOS) by analyzing the provided syllabus and exam content.

    **Instructions:**
    1.  **Group by Topic:** Analyze the syllabus and exam questions. Group the questions by their primary topic from the syllabus.
    2.  **Summarize Outcomes:** For each topic group, summarize the relevant "Intended Learning Outcomes" (ILOs).
    3.  **Count Items:** Count the total number of exam questions for each topic.
    4.  **Estimate Hours:** Estimate the number of instructional hours dedicated to each topic. If the syllabus provides clues, use them; otherwise, make a reasonable professional estimate based on the topic's depth.
    5.  **Distribute by Bloom's Taxonomy:** For each topic, count how many questions fall into each level of Bloom's Taxonomy (Remembering, Understanding, Applying, Analyzing, Evaluating, Creating).
    6.  **List Item Placement:** Provide a comma-separated list of the question numbers for each topic.
    7.  **Calculate Percentage:** Calculate the percentage of the total exam that each topic represents.
    8.  **Calculate Totals:** Create a final "totals" summary for all columns.
    9.  **Format Output:** Format the entire output as a single JSON object strictly adhering to the provided schema, containing 'tableRows' and 'totals'.

    **Syllabus Content:**
    ---
    ${syllabus}
    ---

    **Exam Content:**
    ---
    ${exam}
    ---

    Now, perform the analysis and generate the complete JSON output for the Table of Specifications.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1,
        },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    if (!parsedResult.tableRows || !parsedResult.totals) {
        throw new Error("API returned data in an unexpected format.");
    }

    return parsedResult as TOSResult;
  } catch (error) {
     if (error instanceof Error) {
        // Rethrow specific error messages for better handling in the UI
        if (error.message.includes('API_KEY_INVALID')) {
             throw new Error("API key not valid. Please pass a valid API key.");
        }
     }
     // Rethrow other errors
     throw error;
  }
};
