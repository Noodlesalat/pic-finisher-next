import type { PrintData } from "@/app/types/explorer";

export function generatePrintHTML(data: PrintData): string {
  const { originalUrl, aiUrl, prompt } = data;

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>imAIgine</title>
      <style>
        /* Grundlegende Resets und Druckeinstellungen */
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: #fff !important;
            overflow: hidden;
          }
          .no-print, .no-print * {
            display: none !important;
          }
          .print-page-container {
            page-break-inside: avoid;
            page-break-after: avoid;
          }
        }

        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-sizing: border-box;
          background-color: #fff;
          overflow: hidden;
        }

        .print-page-container {
          width: calc(297mm - 20mm);
          height: calc(210mm - 20mm);
          max-height: calc(210mm - 20mm);
          margin: auto;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          overflow: hidden;
        }

        .print-title-area {
          text-align: center;
          font-size: 16pt;
          font-weight: 700;
          color: #2D3748;
          padding-bottom: 4mm;
          flex-shrink: 0;
          border-bottom: 2px solid #4299E1;
          margin-bottom: 4mm;
          height: 16mm;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .images-comparison-area {
          display: flex;
          flex-grow: 1;
          gap: 8mm;
          width: 100%;
          height: calc(100% - 20mm);
          max-height: calc(210mm - 54mm);
          overflow: hidden;
        }

        .image-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          border: 1px solid #CBD5E0;
          border-radius: 6px;
          padding: 4mm;
          box-sizing: border-box;
          background-color: #F7FAFC;
          overflow: hidden;
          height: 100%;
        }

        .image-wrapper {
          width: 100%;
          height: calc(100% - 12mm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3mm;
          overflow: hidden;
        }

        .image-section img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 3px;
        }

        .image-label {
          text-align: center;
          font-size: 12pt;
          font-weight: 600;
          color: #2D3748;
          flex-shrink: 0;
          height: 8mm;
          line-height: 8mm;
        }
        .original-label { color: #3182CE; }
        .ai-label { color: #38A169; }

      </style>
    </head>
    <body>
      <div class="print-page-container">
        <div class="print-title-area">
          imAIgine
        </div>

        <div class="images-comparison-area">
          <div class="image-section">
            <div class="image-wrapper">
              <img src="${originalUrl}" alt="Originalbild: ${prompt}" />
            </div>
            <div class="image-label original-label">Original (Selbst gemalt)</div>
          </div>
          <div class="image-section">
            <div class="image-wrapper">
              <img src="${aiUrl}" alt="KI-Bild: ${prompt}" />
            </div>
            <div class="image-label ai-label">KI-generiert</div>
          </div>
        </div>
      </div>
      <script>
        (function() {
          let imagesLoaded = 0
          const totalImages = 2
          let printCalled = false

          function attemptPrint() {
            if (printCalled) return
            printCalled = true
            window.print()
          }

          function checkAllImagesLoaded() {
            imagesLoaded++
            if (imagesLoaded >= totalImages) {
              setTimeout(attemptPrint, 600)
            }
          }

          window.onload = function() {
            const images = document.querySelectorAll('img')
            if (images.length === 0 && totalImages === 0) {
              attemptPrint()
              return
            }
            images.forEach(img => {
              if (img.complete) {
                checkAllImagesLoaded()
              } else {
                img.onload = checkAllImagesLoaded
                img.onerror = function() {
                  console.error('Bild konnte nicht geladen werden:', img.src)
                  checkAllImagesLoaded()
                }
              }
            })

            setTimeout(attemptPrint, 2500)
          }

          window.onafterprint = function() {
            setTimeout(function() { window.close() }, 200)
          }
        })()
      </script>
    </body>
    </html>
  `;
}
