import PDFDocument from 'pdfkit';

export class PdfService {
  async generateSimplePdf(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks: Uint8Array[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(25).text('Hello World!', 100, 100);
      doc.end();
    });
  }

  async generatePdfWithContent(content: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks: Uint8Array[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(12).text(content, {
        align: 'left',
        width: 410
      });
      
      doc.end();
    });
  }
}