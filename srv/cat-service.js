const cds = require('@sap/cds');
var XLSX = require('xlsx');
const Stream = require('stream');
const fs = require('fs');

class CatalogService extends cds.ApplicationService {

    init() {

        /**
           * Reflect definitions from the service's CDS model
           */
        const { Export } = this.entities;

        /**
         * Export Handler
         */
        this.on('READ', Export, async req => {
            console.log("I'm here");

            let nulls = [null, null, null, null, null, null, null, null, null, null, null, null]
            /* generate workbook object */
            let ws = XLSX.utils.aoa_to_sheet([
                ['My Company', ...nulls],
                ["Depreciation and Amortization Report", ...nulls],
                [...nulls],
                ["Line No.", ...nulls],
                [...nulls],
                ["2", "Total Cost of Section 179 property place in service", ...nulls]
            ]);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Data");

            /* generate buffer */
            let buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

            fs.writeFileSync('./export/file.xlsx', buf, { encoding: 'base64' });


            // // let exportResult = {}
            // // exportResult.ID = "test";
            // // exportResult.content = buf;

            // // const binaryResult = new Array();
            // // const readableStream = new Stream.Readable();
            // // // readableStream.push(exportResult.content);
            // readableStream.push(buf);
            // // readableStream.push(null);
            // binaryResult.push({
            //     value: readableStream,
            //     // '*@odata.mediaContentType': 'application/pdf',
            // });

            // return binaryResult;

        })

        // Add base class's handlers. Handlers registered above go first.
        return super.init()
    }
}

module.exports = { CatalogService }