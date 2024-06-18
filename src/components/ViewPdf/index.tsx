import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import './style.scss';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfViewer = ({ pdfFile }: { pdfFile: any }) => {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);

  }
 
  return (
    <div className='view-pdf-wrap'>
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) =>
            <Page pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false} />
          )}
      </Document>
    </div>
  );
}

export default PdfViewer;