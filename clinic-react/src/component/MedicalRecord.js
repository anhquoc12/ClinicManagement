import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import { useParams } from "react-router-dom"

const MedicalRecord = () => {
    const [medicalRecord, setMedicalRecord] = useState(null)
    const [prescriptions, setPrescriptions] = useState(null)
    const { medicalId } = useParams()

    useEffect(() => {
        const process = async () => {
            let resMedical = await authAPI().get(endpoints['detailHistory'](medicalId))
            setMedicalRecord(resMedical.data)
            let resPrescription = await authAPI().get(endpoints['detailPrescription'](medicalId))
            setPrescriptions(resPrescription.data)
        }

        process()
    }, [])

    if (medicalRecord === null || prescriptions === null)
        return <Loading />

    return (
        <>
            <section className="content">
                <h1 className="text-secondary mt-2 text-uppercase">Biểu Mẫu Lịch Sử Khám Bệnh</h1>
                <div className="line"></div>
                <div className="info--patient">
                    <div className="field"><span className="field--name">Họ Và Tên</span> <span className="value">{medicalRecord.patientId.fullName}</span>
                    </div>
                </div>
                <div className="info--patient">
                    <div className="field"><span className="field--name">Id</span> <span className="value">{medicalRecord.patientId.id}</span></div>
                </div>
                <div className="info--patient">
                    <div className="field"><span className="field--name">Số điện thoại</span> <span className="value">{medicalRecord.patientId.phone}</span>
                    </div>
                </div>
                <div className="info--patient">
                    <div className="field"><span className="field--name">Email</span> <span className="value">{medicalRecord.patientId.email}</span></div>
                </div>
                <div className="info--patient">
                    <div className="field"><span className="field--name">Ngày Khám</span> <span className="value">{new Date(medicalRecord.createdDate).toISOString().split('T')[0]}</span></div>
                </div>
                <div className="info--patient">
                    <div className="field"><span className="field--name">Bác sỹ thăm khám</span> <span className="value">{medicalRecord.doctorId.fullName}</span></div>
                </div>
                <div className="line"></div>
                <div className="container-fluid mt-3 table">
                    <div className="row rows">
                        <div className="col-sm-3 bg-secondary">Triệu Chứng</div>
                        <div className="col-sm-9">{medicalRecord.symptom}</div>
                    </div>
                    <div className="row rows">
                        <div className="col-sm-3 bg-secondary">Kết Luận</div>
                        <div className="col-sm-9">{medicalRecord.conclusion}</div>
                    </div>
                    <div className="row rows">
                        <div className="col-sm-3 bg-secondary">Lời Khuyên</div>
                        <div className="col-sm-9">{medicalRecord.advice}</div>
                    </div>
                    <div className="row rows">
                        <div className="col-sm-3 bg-secondary">Ghi chú</div>
                        <div className="col-sm-9">{medicalRecord.note}</div>
                    </div>
                </div>
                <div className="line"></div>
                <table className="table table-bordered" border="1">
                    <thead>
                        <tr>
                            <th colspan="5" className="title--table">Toa Thuốc</th>
                        </tr>
                        <tr>
                            <th width="25%" scope="col">Tên Thuốc</th>
                            <th width="20%" scope="col">Liều Lượng</th>
                            <th width="20%" scope="col">Tần suất</th>
                            <th width="20%" scope="col">Thời gian sử dụng</th>
                            <th width="15%" scope="col">Số Lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prescriptions.map(p => (
                                <tr>
                                    <td>{p.medicineId.name}</td>
                                    <td>{p.dosage}</td>
                                    <td>{p.frequency}</td>
                                    <td>{p.duration}</td>
                                    <td>{p.totalUnit} {p.medicineId.unitMedicineId.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default MedicalRecord