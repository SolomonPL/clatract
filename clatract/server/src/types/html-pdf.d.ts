declare module 'html-pdf' {
  export interface PDFOptions {
    format?: string;
    orientation?: 'portrait' | 'landscape';
    border?: string | {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
    header?: {
      height?: string;
      contents?: string;
    };
    footer?: {
      height?: string;
      contents?: string;
    };
    type?: string;
    quality?: number;
    timeout?: number;
    [key: string]: any;
  }

  export interface PDFResult {
    filename: string;
    toBuffer(callback: (err: Error | null, buffer: Buffer) => void): void;
    toFile(filename: string, callback: (err: Error | null, res: any) => void): void;
    toStream(callback: (err: Error | null, stream: NodeJS.ReadableStream) => void): void;
  }

  export function create(html: string, options?: PDFOptions): PDFResult;
  
  const pdf: {
    create: typeof create;
  };
  
  export default pdf;
} 