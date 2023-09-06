import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import { Navigate, useParams } from "react-router-dom"
import { exportPDF } from "../scripts/ExportPDF"

const Prescription = () => {
    const [medicines, setMedicine] = useState(null)
    const [keyword, setKeyword] = useState('')
    const { medicalId } = useParams()
    const [prescription, setPrescription] = useState([])
    const [hiddenAddButtons, setHiddenAddButtons] = useState([]);
    const [medical, setMedical] = useState(null)
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
            try {
                console.log(medicalId)
                let res = await authAPI('json').post(endpoints['addPrescription'](medicalId), 
                json)
                let medicalRecord = await authAPI().get(endpoints['detailHistory'](medicalId))
                setMedical(medicalRecord.data)
                var object = {
                    doctorName: medical.doctorId.fullName,
                    doctorAddress: medical.doctorId.address,
                    doctorPhone: medical.doctorId.phone,
                    patientName: medical.patientId.fullName,
                    patientAddress: medical.patientId.address,
                    patientPhone: medical.patientId.phone,
                    advice: medical.advice
                }
                alert(res.data)
                
            } catch(ex) {
                console.log(ex)
            } finally {
                setComplete(true)
            }
        }
    }

    useEffect(() => {
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