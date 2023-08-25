import { useEffect, useState } from "react"
import { Alert, Table } from "react-bootstrap"
import Apis, { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import Cookies from "js-cookie"

const Patients = () => {
    const [patients, setPatients] = useState(null)
    const a = 10

    useEffect(() => {
        const loadPatients = async () => {
            try {
                let res =  await authAPI().get(endpoints['patients'])
                setPatients(res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadPatients()
        
    }, [a])

    if (patients === null) {
        console.log('test')
        console.log(Cookies.get('token'))
        return (<Loading />)
    }
       
    

    return (
        <>
        <Alert variant="success">Danh Sách bệnh nhân</Alert>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Họ Tên</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        patients.map((p, index) => (
                            <tr>
                                    <td>{p[0]}</td>
                                    <td>{p[1]}</td>
                                    <td>{p[2]}</td>
                                    <td>{p[3]}</td>
                                </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Patients