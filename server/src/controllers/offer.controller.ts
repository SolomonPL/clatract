import { Request, Response } from 'express';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate offer clarity based on user input
 * @param req Request object
 * @param res Response object
 */
export const generateOfferClarity = async (req: Request, res: Response) => {
  try {
    const { description, targetAudience, serviceType } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Service description is required' });
    }

    // Generate one-liner and elevator pitch using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter for service providers, coaches and freelancers. You help them create clear, compelling messaging about their services."
        },
        {
          role: "user",
          content: `Create a concise, compelling one-liner and short elevator pitch for this service:
          
          Service Description: ${description}
          Target Audience: ${targetAudience || 'Not specified'}
          Service Type: ${serviceType || 'Not specified'}
          
          Format the response as JSON with these keys:
          - oneLiner (max 15 words)
          - elevatorPitch (max 50 words)
          - callToAction (optional, max 10 words)`
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Error generating offer clarity:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error generating offer clarity'
    });
  }
}; 