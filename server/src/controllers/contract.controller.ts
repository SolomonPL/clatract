import { Request, Response } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import pdf from 'html-pdf';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a contract based on the offer details
 * @param req Request object
 * @param res Response object
 */
export const generateContract = async (req: Request, res: Response) => {
  try {
    const {
      serviceDescription,
      deliverables,
      timeframe,
      price,
      paymentSchedule,
      providerName,
      clientName,
      additionalTerms
    } = req.body;

    if (!serviceDescription || !deliverables || !price || !providerName || !clientName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required contract details'
      });
    }

    // Generate contract content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional contract writer for freelancers and service businesses. Create legally sound service agreements that protect both parties."
        },
        {
          role: "user",
          content: `Create a professional service agreement with the following details:
          
          Service Provider: ${providerName}
          Client: ${clientName}
          Service Description: ${serviceDescription}
          Deliverables: ${Array.isArray(deliverables) ? deliverables.join(', ') : deliverables}
          Timeframe: ${timeframe || 'Not specified'}
          Price: ${price}
          Payment Schedule: ${paymentSchedule || 'Full payment upfront'}
          Additional Terms: ${additionalTerms || 'None'}
          
          Format as a formal contract with appropriate sections including services, deliverables, compensation, intellectual property rights, termination clauses, and limitations of liability.`
        }
      ]
    });

    const contractText = completion.choices[0].message.content || '';
    
    // Save contract in database or temporary storage
    // This is simplified for the example - you would typically save to MongoDB
    const contractId = Date.now().toString();
    const contractData = {
      id: contractId,
      content: contractText,
      provider: providerName,
      client: clientName,
      created: new Date(),
      // Add other fields as needed
    };
    
    return res.status(200).json({
      success: true,
      data: contractData
    });
  } catch (error: any) {
    console.error('Error generating contract:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error generating contract'
    });
  }
};

/**
 * Get contract by ID
 * @param req Request object
 * @param res Response object
 */
export const getContractById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // In a real app, you would fetch from your database
    // For demo purposes, returning mock data
    const contractData = {
      id,
      content: 'This is a sample contract content. In a real app, this would be retrieved from a database.',
      provider: 'Sample Provider',
      client: 'Sample Client',
      created: new Date(),
    };
    
    return res.status(200).json({
      success: true,
      data: contractData
    });
  } catch (error: any) {
    console.error('Error retrieving contract:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving contract'
    });
  }
};

/**
 * Export contract as PDF
 * @param req Request object
 * @param res Response object
 */
export const exportContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // In a real app, you would fetch the contract from your database
    // For demo purposes, using mock data
    const contractData = {
      id,
      content: `
        <h1>SERVICE AGREEMENT</h1>
        <p>Between Sample Provider and Sample Client</p>
        <p>This is a sample contract that would be generated from our database.</p>
        <h2>Services</h2>
        <p>Provider will deliver coaching services as described.</p>
        <h2>Compensation</h2>
        <p>Client agrees to pay $1,000 for the services described herein.</p>
        <h2>Terms and Conditions</h2>
        <p>This agreement will be governed by the laws of the State of California.</p>
        <div style="margin-top: 50px;">
          <p>Signed: ________________________</p>
          <p>Date: ________________________</p>
        </div>
      `,
      provider: 'Sample Provider',
      client: 'Sample Client',
    };
    
    // Convert HTML to PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; }
          h2 { color: #555; margin-top: 20px; }
          .signature { margin-top: 60px; }
        </style>
      </head>
      <body>
        ${contractData.content}
      </body>
      </html>
    `;
    
    // PDF options
    const options = { 
      format: 'Letter',
      timeout: 25000 // Increase timeout for serverless environment
    };
    
    // Create PDF with promise for better serverless handling
    // Wrap the pdf creation in a promise to handle errors better
    const generatePdf = () => {
      return new Promise((resolve, reject) => {
        const pdf = require('html-pdf');
        pdf.create(html, options).toBuffer((err: Error | null, buffer: Buffer) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(buffer);
        });
      });
    };

    try {
      const buffer = await generatePdf() as Buffer;
      
      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="contract-${id}.pdf"`);
      
      // Send PDF buffer
      return res.send(buffer);
    } catch (pdfError) {
      console.error('Error creating PDF:', pdfError);
      return res.status(500).json({
        success: false,
        message: 'Error creating PDF'
      });
    }
  } catch (error: any) {
    console.error('Error exporting contract:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error exporting contract'
    });
  }
}; 