import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../configs/Apis"
import { Alert, Table } from "react-bootstrap"
import { Doughnut } from "react-chartjs-2"

const Stat = () => {
    const [countPatient, setCountPatient] = useState(null)
    const [totalRevenue, setTotalRevenue] = useState(null)
    const [countMedical, setCountMedical] = useState(null)
    const [revenue, setRevenue] = useState(null)
    const [patients, setPatients] = useState(null)
    const [medicineMin, setMedicineMin] = useState(null)
    const [medicineMax, setMedicineMax] = useState(null)

useEffect(() => {
    const loadCountPatient = async () => {
        let res = await authAPI().get(endpoints['countPatient'])
        setCountPatient(res.data)
    }
    const loadTotalRevenue = async () => {
        let res = await authAPI().get(endpoints['totalRevenue'])
        setTotalRevenue(res.data)
    }
    const loadcountMedical = async () => {
        let res = await authAPI().get(endpoints['countMedical'])
        setCountMedical(res.data)
    }

    const loadMedicineStat = async () => {
        let res = await authAPI().get(endpoints['medicineStat'](0))
        setMedicineMax(res.data)
        res = await authAPI().get(endpoints['medicineStat'](1))
        setMedicineMin(res.data)
    }

    loadCountPatient()
    loadTotalRevenue()
    loadcountMedical()
    loadMedicineStat()
}, [])

return (<>
    <Alert variant="info">Thống kê - báo cáo</Alert>
    {countPatient !== null || countMedical !== null || totalRevenue !== null || medicineMax !== null || medicineMin !== null ? <>
        <Table responsive>
            <thead>
                <tr>
                    <td>Số lượng bệnh nhân</td>
                    <td>Tổng doanh thu</td>
                    <td>Số lượng ca khám</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{countPatient}</td>
                    <td>{totalRevenue}</td>
                    <td>{countMedical}</td>
                </tr>
            </tbody>
        </Table>
        <div className="mt-5"></div>
        <Alert variant="success">Thống kê thuốc đã dùng nhiều nhất</Alert>
        <Table responsive>
            <thead>
                <tr>
                    <td>Tên thuốc</td>
                    <td>Số thuốc</td>
                </tr>
            </thead>
            <tbody>
                {
                    medicineMax.map(m => (
                        <tr>
                    <td>{m[0]}</td>
                    <td>{m[1]}</td>
                </tr>
                    ))
                }
            </tbody>
        </Table>
        <div className="mt-5"></div>
        <Alert variant="success">Thống kê thuốc đã dùng ít nhất</Alert>
        <Table responsive>
            <thead>
                <tr>
                    <td>Tên thuốc</td>
                    <td>Số thuốc</td>
                </tr>
            </thead>
            <tbody>
                {
                    medicineMin.map(m => (
                        <tr>
                    <td>{m[0]}</td>
                    <td>{m[1]}</td>
                </tr>
                    ))
                }
            </tbody>
        </Table>
        <div className="mt-5"></div>
    </> : <span></span>}

</>)
}

export default Stat