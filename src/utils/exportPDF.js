import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId, filename = 'CommerceIQ_Executive_Report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return;
  }
  
  try {
    // Temporarily hide elements we don't want in the PDF (e.g., scrollbars if they were causing issues, or the export button itself if inside)
    const canvas = await html2canvas(element, { 
      scale: 2, 
      useCORS: true,
      backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#F7F9FC'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF Export failed", error);
  }
};
