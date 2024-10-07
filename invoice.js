function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Customer and Invoice Data
    const customerName = document.getElementById('customer-name').value;
    const customerAddress = document.getElementById('customer-address').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerEmail = document.getElementById('customer-email').value;
    const invoiceNumber = Math.floor(Math.random() * 1000000); // Random invoice number
    const issueDate = new Date().toLocaleDateString();
    const itemDescription = document.getElementById('service-needed').value;
    const houseSize = document.getElementById('house-size').value;
    const totalPrice = parseFloat(document.getElementById('total-price').value);
    const gstRate = 0.05;
    const gstAmount = totalPrice * gstRate;
    const totalAmount = totalPrice + gstAmount;
    // Styling settings
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const lineSpacing = 6;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    // Header - Company Info
    doc.addImage('logo2.png', 'PNG', 10, 10, 42, 32); // Adjust logo size and position
    doc.setTextColor(40, 78, 120); // Dark blue
    doc.text("One Day Roofing & Siding LTD", 60, 18);
    doc.setFontSize(12);
    doc.setTextColor(64, 63, 63); // Gray color
    doc.text("122 Pineset Place NE, Calgary, AB, Canada", 60, 25);
    doc.text("Phone: +1 (403) 971-9075", 60, 31);
    doc.text("Email: habtehani@yahoo.com", 60, 37);
    // Invoice Header
    doc.setLineWidth(0.5);
    doc.line(margin, 45, pageWidth - margin, 45); // Line separator
    doc.setFontSize(16);
    doc.setTextColor(40, 78, 120); // Dark blue
    doc.text("INVOICE", margin, 60);
    
    // Invoice Details
    doc.setFontSize(12);
    doc.setTextColor(64, 63, 63);
    doc.text(`Invoice Number: ${invoiceNumber}`, margin, 70);
    doc.text(`Issue Date: ${issueDate}`, margin, 76);
    // Customer Information
    doc.setTextColor(40, 78, 120); // Section header color
    doc.setFontSize(14);
    doc.text("Bill To:", margin, 90);
    doc.setFontSize(12);
    doc.setTextColor(64, 63, 63); // Gray text
    doc.text(`Name: ${customerName}`, margin, 98);
    doc.text(`Address: ${customerAddress}`, margin, 104);
    doc.text(`Phone: ${customerPhone}`, margin, 110);
    doc.text(`Email: ${customerEmail}`, margin, 116);
    // Table of Service/Materials
    const serviceItems = [
        ['Description', 'House Size (sq.ft)', 'Price (CAD)'],
        [itemDescription, houseSize, totalPrice.toFixed(2)]
    ];
    doc.autoTable({
        startY: 130,
        head: [serviceItems[0]],
        body: [serviceItems[1]],
        headStyles: {
            fillColor: [40, 78, 120], // Dark blue header
            textColor: [255, 255, 255] // White text
        },
        theme: 'grid',
        styles: {
            fontSize: 12,
            cellPadding: 6,
            halign: 'center'
        }
    });
    // Subtotal, GST, Total Section
    const finalY = doc.autoTable.previous.finalY + 20; // Position based on previous table
    doc.setFontSize(14);
    doc.setTextColor(40, 78, 120);
    doc.text("Summary", margin, finalY + lineSpacing * 9);
    doc.setFontSize(12);
    doc.setTextColor(64, 63, 63);
    doc.text(`Subtotal (CAD): ${totalPrice.toFixed(2)}$`, margin, finalY + lineSpacing * 10.5);
    doc.text(`GST (5%): ${gstAmount.toFixed(2)}$`, margin, finalY + lineSpacing * 11.5);
    doc.text(`Total Amount (CAD): ${totalAmount.toFixed(2)}$`, margin, finalY + lineSpacing * 12.5);

    // Payment Method Section
    const finalYWithSummary = finalY + lineSpacing * 15;
    doc.setFontSize(14);
    doc.setTextColor(40, 78, 120);
    doc.text("Payment Method", margin, pageHeight - 120);

    doc.setFontSize(12);
    doc.setTextColor(64, 63, 63);
    doc.text("Bank Name: TD canada trust.", margin, pageHeight - 112);
    doc.text("Account Number: 0000 0000 0000", margin, pageHeight - 106);
    doc.text("IBAN: ZT14IHNLN6897565 78967", margin, pageHeight - 100);
    doc.text("SWIFT/BIC: 6769870909", margin, pageHeight - 94);
    //doc.text("PayPal: payments@onedayroofing.com", margin, pageHeight - 88); 
    
    
    // Footer - Notes/Terms
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 34, pageWidth - margin, pageHeight - 34); // Line separator
    doc.setFontSize(8);
    doc.setTextColor(64, 63, 63); // Gray color
    doc.text("Thank you for choosing One Day Roofing & Siding LTD.!", margin, pageHeight - 24);
    doc.text("For any inquiries, please contact us at +1 (403) 971-9075 or email habtehani@yahoo.com.", margin, pageHeight - 18);

    
    // Save the PDF
    window.open(doc.output('bloburl'));
}