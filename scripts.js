function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const customerName = document.getElementById('customer-name').value;
    const customerAddress = document.getElementById('customer-address').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerEmail = document.getElementById('customer-email').value;

    const serviceDate = document.getElementById('service-date').value;
    const roofType = document.getElementById('roof-type').value;
    const serviceNeeded = document.getElementById('service-needed').value;
    
    // Getting the quantities for materials
    const bundle = document.getElementById('bundle').value;
    const ridgeCap = document.getElementById('ridge-cap').value;
    const starter = document.getElementById('starter').value;
    const valleyFlashing = document.getElementById('valley-flashing').value;
    const dripEdge = document.getElementById('drip-edge').value;
    const iceAndWater = document.getElementById('ice-and-water').value;
    const airVent = document.getElementById('air-vent').value;
    const goosenacks = document.getElementById('goosenacks').value;
    const plumbingCollars = document.getElementById('plumbing-collars').value;
    const paper = document.getElementById('paper').value;
    const wallFlashing = document.getElementById('wall-flashing').value;
    const stepFlashing = document.getElementById('step-flashing').value;
    const nails = document.getElementById('nails').value;
    const caulking = document.getElementById('caulking').value;
    const polywoodSheets = document.getElementById('polywood-sheets').value;
    const houseSize = document.getElementById('house-size').value;
    const totalPrice = document.getElementById('total-price').value;

    // Validate all required fields
    if (!serviceDate || !roofType || !serviceNeeded || !houseSize || !totalPrice) {
        alert('Please fill out all fields.');
        return;
    }
    const title = "Service Report";
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPosition = (pageWidth - titleWidth) / 2; // Calculate centered position

    const warrantyInfo = `House Size: ${houseSize} sq.ft\nTotal Price: ${totalPrice} CAD\nLabor Warranty: 6 years\nShingle Warranty: 25 years (Iko and Owen Duration)`;
    const bottomYPosition = doc.internal.pageSize.getHeight() - 30; 
    const lines = doc.splitTextToSize(warrantyInfo, pageWidth - 20); // Splits text into multiple lines to fit page
    
   
    doc.addImage('logo2.png', 'PNG', 10, 10, 40, 20); // Adjust logo size

    // Company Information Block
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 78, 120); // Dark blue color
    doc.text("One Day Roofing & siding LTD", 60, 15);
    doc.setFontSize(12);
    doc.setTextColor(64, 63, 63 ); // Back to black
    doc.text("122 pineset place NE, Calgary, AB, Canada", 60, 25);
    doc.text("Phone: +1 (403) 971-9075", 60, 31);
    doc.text("Email: habtehani@yahoo.com", 60, 37);

    // Add a line separator under the company info
    doc.setLineWidth(0.5);
    doc.line(10, 42, 200, 42);

    // Customer Information Block
    doc.setFontSize(14);
    doc.setTextColor(40, 78, 120); // Dark blue for section title
    doc.text("Customer Information", 10, 50);
    doc.setFontSize(10);
    doc.setTextColor(64, 63, 63 ); // Black text

    // Customer information
    doc.text(`Name: ${customerName}`, 12, 60);
    doc.text(`Address: ${customerAddress}`, 12, 66);
    doc.text(`Phone: ${customerPhone}`, 12, 72);
    doc.text(`Email: ${customerEmail}`, 12, 78);

    // Service Report Section
    doc.text(title, xPosition, 95);

    doc.setFontSize(10);
    doc.setTextColor(64, 63, 63 ); // Black text
    doc.text(`Service Date: ${serviceDate}`, 10, 102);

    // Add the service report table with material quantities
    const materials = [
        ['Type of Roof', roofType],
        ['Service Needed', serviceNeeded],
        ['Bundle', bundle],
        ['Ridge Cap', ridgeCap],
        ['Starter', starter],
        ['Valley Flashing', valleyFlashing],
        ['Drip Edge', dripEdge],
        ['Ice & Water', iceAndWater],
        ['Air Vent', airVent],
        ['Goosenacks', goosenacks],
        ['Plumbing Collars', plumbingCollars],
        ['Paper', paper],
        ['Wall Flashing', wallFlashing],
        ['Step Flashing', stepFlashing],
        ['Nails', nails],
        ['Caulking', caulking],
        ['Polywood Sheets', polywoodSheets],
        ['House Size (sq.ft)', houseSize],
        ['Estimated Cost (CAD)', totalPrice],
    ];

    // Use autoTable to display the material quantities
    doc.autoTable({
        head: [['Material', 'Quantity']],
        body: materials,
        startY: 120,
        theme: 'grid',
        headStyles: {
            fillColor: [40, 78, 120], // Dark blue for header
            textColor: [255, 255, 255], // White text for header
        },
        bodyStyles: {
            fillColor: [245, 245, 245], // Light gray for alternating rows
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255], // White for alternate rows
        },
        styles: {
            fontSize: 11,
            cellPadding: 5,
        }
    });

    // Footer - Add page number at the bottom
    doc.setFontSize(10);
    doc.text(`Page ${doc.internal.getNumberOfPages()}`, 190, 290, null, null, "right");
    doc.text(lines, 10, bottomYPosition);

    

    // Save the PDF
    //doc.save('service_report.pdf');
    window.open(doc.output('bloburl'));
}

