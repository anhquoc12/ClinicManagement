import pdfMake from 'pdfmake/build/pdfmake';
function dateFormat(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Đổi 0 thành 12 nếu là 12 giờ

    var formattedDate = ('0' + date.getDate()).slice(-2) + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        date.getFullYear() + ' ' +
        ('0' + hours).slice(-2) + ':' +
        ('0' + minutes).slice(-2) + ':' +
        ('0' + seconds).slice(-2) + ' ' + ampm;

    return formattedDate;
}

function formatDate(date) {
    var formattedDate = ('0' + date.getDate()).slice(-2) +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        date.getFullYear();

    return formattedDate;
}

export const exportPDF = (data, object) => {
    return new Promise((resolve, reject) => {
        try {
            var json = data
            var tableBody = []
            var advice = object.advice === 'none' ? "" : object.advice
            tableBody.push([{ text: "Tên thuốc", bold: true },
            { text: "Liều Lượng", bold: true },
            { text: "Tần suất", bold: true },
            { text: "Thời gian dùng thuốc", bold: true },
            { text: "Số Lượng", bold: true }])
            tableBody.push([{
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 450, y2: 0,
                        lineWidth: 1, // Độ dày của đường
                    }
                ]
            }, {}, {}, {}, {}])

            json.forEach(data => {
                tableBody.push([data.name, data.dosage, data.frequency, data.duration, data.totalUnit + ' ' + data.unit])
            })
            var docDefinition = {
                content: [
                    {
                        text: 'DR ' + object.doctorName,
                        margin: [0, 0, 0, 8],
                        color: '#64BACD',
                        bold: true
                    },
                    {
                        text: 'Address: ' + object.doctorAddress,
                        margin: [0, 0, 0, 8],
                        bold: true,
                        fontSize: 16
                    },
                    {
                        text: 'SDT: ' + object.doctorPhone,
                        margin: [0, 0, 0, 8],
                        bold: true,
                        fontSize: 16
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 0,
                                x2: 450, y2: 0,
                                lineWidth: 1 // Độ dày của đường
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'Patient: ' + object.patientName,
                                alignment: 'left'
                            },
                            {
                                text: 'Date: ' + dateFormat(new Date()),
                                alignment: 'right'
                            }
                        ],
                        margin: [0, 16, 0, 0]
                    },
                    {
                        text: 'Address: ' + object.patientAddress,
                        margin: [0, 8, 0, 8],
                        fontSize: 12
                    },
                    {
                        text: 'SDT: ' + object.patientPhone,
                        margin: [0, 0, 0, 8],
                        fontSize: 12
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 2, y1: 0,
                                x2: 450, y2: 0,
                                lineWidth: 1 // Độ dày của đường
                            }
                        ]
                    },
                    {
                        table: {
                            widths: [98, 66, 98, 80, 60],
                            body: tableBody
                        },
                        width: 500,
                        layout: {
                            hLineWidth: (i, node) => {
                                return 0; // Bỏ đường kẻ ngang
                            },
                            vLineWidth: (i, node) => {
                                return 0; // Bỏ đường kẻ dọc
                            }
                        }
                    },

                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0, y1: 0,
                                x2: 450, y2: 0,
                                lineWidth: 1 // Độ dày của đường
                            }
                        ]
                    },
                    {
                        text: "*Advice: " + advice,
                        fontSize: 16,
                        bold: true,
                        margin: [8, 16, 0, 0]
                    },
                    {
                        text: "DR " + object.doctorName,
                        fontSize: 16,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 200, 0, 0]
                    }

                ], padding: [16, 16, 16, 16], alignment: 'center', pageWidth: 500, autoSize: true
            };

            // pdfMa.createPdf(docDefinition).download(`${object.file}-${formatDate(new Date())}.pdf`)
            pdfMake.createPdf(docDefinition).download(`${object.file}-${() =>formatDate(new Date())}.pdf`)
            resolve()
        } catch (ex) { reject(new Error(ex.message)) }
    })
}