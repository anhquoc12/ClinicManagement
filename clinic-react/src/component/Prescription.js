import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import { Navigate, useParams } from "react-router-dom"

const Prescription = () => {
    const [medicines, setMedicine] = useState(null)
    const [keyword, setKeyword] = useState('')
    const { medicalId } = useParams()
    // const [prescription, setPrescription] = useState({
    //     'medicine': '',
    //     'medical': medicalId,
    //     'dosage': '',
    //     'frequency': '',
    //     'duration': '',
    //     'totalUnit': ''
    // })
    const [prescription, setPrescription] = useState([])
    const [hiddenAddButtons, setHiddenAddButtons] = useState([]);
    const [complete, setComplete] = useState(false)
    const handleAddToPrescriptionT = (medicine, dosage, frequency, duration, total) => {
        const newItem = {
            medicine: medicine.id,
            medicineName: medicine.name,
            dosage: dosage,
            frequency: frequency,
            duration: duration,
            total: total,
            unitMedicineId: medicine.unitMedicineId.id,
            unitName: medicine.unitMedicineId.name
        };
        setPrescription([...prescription, newItem]);

        setHiddenAddButtons([...hiddenAddButtons, medicine.id]);
    };

    const handleAddToPrescription = (medicine) => {
        setPrescription([...prescription, medicine]);

        // Ẩn nút "Add" cho thuốc đã được thêm vào toa thuốc
        setHiddenAddButtons([...hiddenAddButtons, medicine.id]);
    };

    const handleRemoveFromPrescription = (medicine, index) => {
        const updatedPrescription = prescription.filter((item) => item.id !== medicine.id);
        const updatedHiddenAddButtons = [...hiddenAddButtons];
        updatedHiddenAddButtons[index] = false;

        setPrescription(updatedPrescription);
        setHiddenAddButtons(updatedHiddenAddButtons)
    };

    // async function exportPDF(object, data) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             var json = data
    //             var tableBody = []
    //             var advice = object.advice === 'none' ? "" : object.advice
    //             tableBody.push([{ text: "Tên thuốc", bold: true },
    //             { text: "Liều Lượng", bold: true },
    //             { text: "Tần suất", bold: true },
    //             { text: "Thời gian dùng thuốc", bold: true },
    //             { text: "Số Lượng", bold: true }])
    //             tableBody.push([{
    //                 canvas: [
    //                     {
    //                         type: 'line',
    //                         x1: 0, y1: 0,
    //                         x2: 450, y2: 0,
    //                         lineWidth: 1, // Độ dày của đường
    //                     }
    //                 ]
    //             }, {}, {}, {}, {}])
    
    //             json.forEach(data => {
    //                 tableBody.push([data.name, data.dosage, data.frequency, data.duration, data.totalUnit + ' ' + data.unit])
    //             })
    //             var a = "test"
    //             var docDefinition = {
    //                 content: [
    //                     {
    //                         text: 'DR ' + object.doctorName,
    //                         margin: [0, 0, 0, 8],
    //                         color: '#64BACD',
    //                         bold: true
    //                     },
    //                     {
    //                         text: 'Address: ' + object.doctorAddress,
    //                         margin: [0, 0, 0, 8],
    //                         bold: true,
    //                         fontSize: 16
    //                     },
    //                     {
    //                         text: 'SDT: ' + object.doctorPhone,
    //                         margin: [0, 0, 0, 8],
    //                         bold: true,
    //                         fontSize: 16
    //                     },
    //                     {
    //                         canvas: [
    //                             {
    //                                 type: 'line',
    //                                 x1: 0, y1: 0,
    //                                 x2: 450, y2: 0,
    //                                 lineWidth: 1 // Độ dày của đường
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         columns: [
    //                             {
    //                                 text: 'Patient: ' + object.patientName,
    //                                 alignment: 'left'
    //                             },
    //                             {
    //                                 text: 'Date: ' + dateFormat(new Date()),
    //                                 alignment: 'right'
    //                             }
    //                         ],
    //                         margin: [0, 16, 0, 0]
    //                     },
    //                     {
    //                         text: 'Address: ' + object.patientAddress,
    //                         margin: [0, 8, 0, 8],
    //                         fontSize: 12
    //                     },
    //                     {
    //                         text: 'SDT: ' + object.patientPhone,
    //                         margin: [0, 0, 0, 8],
    //                         fontSize: 12
    //                     },
    //                     {
    //                         canvas: [
    //                             {
    //                                 type: 'line',
    //                                 x1: 2, y1: 0,
    //                                 x2: 450, y2: 0,
    //                                 lineWidth: 1 // Độ dày của đường
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         table: {
    //                             widths: [98, 66, 98, 80, 60],
    //                             body: tableBody
    //                         },
    //                         width: 500,
    //                         layout: {
    //                             hLineWidth: (i, node) => {
    //                                 return 0; // Bỏ đường kẻ ngang
    //                             },
    //                             vLineWidth: (i, node) => {
    //                                 return 0; // Bỏ đường kẻ dọc
    //                             }
    //                         }
    //                     },
    
    //                     {
    //                         canvas: [
    //                             {
    //                                 type: 'line',
    //                                 x1: 0, y1: 0,
    //                                 x2: 450, y2: 0,
    //                                 lineWidth: 1 // Độ dày của đường
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         text: "*Advice: " + advice,
    //                         fontSize: 16,
    //                         bold: true,
    //                         margin: [8, 16, 0, 0]
    //                     },
    //                     {
    //                         text: "DR " + object.doctorName,
    //                         fontSize: 16,
    //                         bold: true,
    //                         alignment: 'right',
    //                         margin: [0, 200, 0, 0]
    //                     }
    
    //                 ], padding: [16, 16, 16, 16], alignment: 'center', pageWidth: 500, autoSize: true
    //             };
    
    //             pdfMake.createPdf(docDefinition).download(`${object.file}-${formatDate(new Date())}.pdf`)
    //             resolve()
    //         } catch (ex) { reject(new Error(ex.message)) }
    //     })
    // }

    const processTable = async () => {

        const json = [];
        let shouldAlert = false; // Biến cờ để kiểm tra xem đã hiển thị alert chưa

        prescription.forEach((item, index) => {
            if (item.dosage === null || item.frequency === null || item.duration === null || item.total === null) {
                shouldAlert = true;
                return; // Không cần thêm thông tin vào json nếu dữ liệu không hợp lệ
            } else {
                json.push({
                    'medicineId': item.medicine,
                    'name': item.medicineName,
                    'dosage': item.dosage,
                    'frequency': item.frequency,
                    'duration': item.duration,
                    'totalUnit': item.total,
                    'unit': item.unitMedicineId
                });
            }
        });

        if (shouldAlert) {
            alert('Vui lòng nhập đầy đủ');
        }
        else {
            console.log(json)
            try {
                let res = await authAPI().post(endpoints['addPrescription'](medicalId), 
                json)
                console.log(res.data)
                
            } catch(ex) {
                console.log(ex)
            }
        }
        setComplete(true)
    }

    useEffect(() => {
        console.log('test1')
        const loadMedicine = async () => {
            let res = await authAPI().get(endpoints['medicines'])
            if (keyword !== '')
                res = await authAPI().get(`${endpoints['medicines']}?name=${keyword}`)
            setMedicine(res.data)
        }

        loadMedicine()
    }, [keyword])

    if (medicines === null)
        return <Loading />

        if(complete)
        return <Navigate to='/doctor/medical' />

    return (<>
        <Form className="mt-5">
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm="1"></Col>
                <Form.Label column sm="2">
                    Tìm Kiếm
                </Form.Label>
                <Col sm="5">
                    <Form.Control type="text" placeholder="Search..." onChange={e => setKeyword(e.target.value)} />
                </Col>
            </Form.Group>
        </Form>
        <table id="dataTable" class="table table-light table-borderless table-scroll small-first-col">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên thuốc</th>
                    <th scope="col">Số Lượng</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Đơn vị thuốc</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="body-half-screen">
                {
                    medicines.map(m => (
                        <tr class="medicine list">
                            <td class="id" scope="row">{m.id}</td>
                            <td class="medicine--name">{m.name}</td>
                            <td class="stock">{m.unitInStock}</td>
                            <td class="medicine--category">{m.categoryId.name}</td>
                            <td class="medicine--unit">{m.unitMedicineId.name}</td>
                            <td>
                                {!hiddenAddButtons.includes(m.id) && (
                                    <Button variant="outline-secondary" style={{ width: '100%' }} onClick={() => handleAddToPrescriptionT(m, null, null, null)}>Add</Button>
                                )}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <div class="wid15 alert alert-info mt-5 mb-5">Toa Thuốc</div>
        <table class="table caption-top wid50" id="myTable">
            <thead>
                <tr class="header" style={{ borderTop: '1px solid black' }}>
                    <th scope="col">Tên Thuốc</th>
                    <th scope="col">Liều Lượng</th>
                    <th scope="col">Tần suất dùng thuốc</th>
                    <th scope="col">Thời gian dùng thuốc</th>
                    <th scope="col">Số Lượng</th>
                    <th scope="col">Đơn Vị</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {prescription.map((medicine, index) => (
                    <tr key={index}>
                        <td>{medicine.medicineName}</td>
                        <td><Form.Control type="text" placeholder="Liều lượng" onChange={(e) => {
                            const updatedPrescription = [...prescription];
                            updatedPrescription[index].dosage = e.target.value;
                            setPrescription(updatedPrescription);
                        }} /></td>
                        <td><Form.Control type="text" placeholder="Tần suất dùng thuốc" onChange={(e) => {
                            const updatedPrescription = [...prescription];
                            updatedPrescription[index].frequency = e.target.value;
                            setPrescription(updatedPrescription);
                        }} /></td>
                        <td><Form.Control type="text" placeholder="Thời gian dùng thuốc" onChange={(e) => {
                            const updatedPrescription = [...prescription];
                            updatedPrescription[index].duration = e.target.value;
                            setPrescription(updatedPrescription);
                        }} /></td>
                        <td><Form.Control type="number" placeholder="Số Lượng" onChange={(e) => {
                            const updatedPrescription = [...prescription];
                            updatedPrescription[index].total = e.target.value;
                            setPrescription(updatedPrescription);
                        }} /></td>
                        <td>{medicine.unitName}</td>
                        <td><Button variant="outline-danger" onClick={() => handleRemoveFromPrescription(medicine, index)}>Xoá</Button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button class="btn btn-info mb-5 mt-5" id="export" onClick={processTable}
            style={{ marginLeft: 'auto', display: 'block', marginRight: '30%' }}><i class="fa-solid fa-file-export"></i>
            <span>Xuất Toa Thuốc</span>
        </button>
    </>)
}
export default Prescription