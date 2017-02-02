/**
 * Created by charlie on 3/2/16.
 */
Router.route('/infopages', function() {
    var doc = new PDFDocument({size: 'A4', margin: 50});
    doc.fontSize(12);
    doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});
    this.response.writeHead(200, {
        'Content-type': 'application/pdf',
        'Content-Disposition': "attachment; filename=TeamQueueInfoPages.pdf"
    });
    this.response.end( doc.outputSync() );
}, {where: 'server'});