import { useEffect, useState } from 'react'
import '../static/css/payment.css'
import { Navigate, useParams } from 'react-router-dom'
import { authAPI, endpoints } from '../configs/Apis'
import Loading from '../layout/Loading'
import { Button } from 'react-bootstrap'
const DetailInvoice = () => {
    const [invoice, setInvoice] = useState(null)
    const [prescriptions, setPrescription] = useState(null)
    const [fees, setFees] = useState(null)
    const { invoiceId } = useParams()
    const [add, setAdd] = useState(false)

    const payment = async () => {
        try {
            let res = await authAPI().post(endpoints['payment'](invoiceId))
            alert(res.data)
            setAdd(true)
        } catch (ex) {
            alert('CÓ LỖI XẢY RA!!!')
        }
        
    }

    useEffect(() => {
        const loadInvoice = async () => {
            let res = await authAPI().get(endpoints['detailInvoice'](invoiceId))
            setInvoice(res.data)
        }

        const loadPrescription = async () => {
            let res = await authAPI().get(endpoints['prescriptionsByInvoiceId'](invoiceId))
            setPrescription(res.data)
        }

        const loadFees = async () => {
            let res = await authAPI().get(endpoints['totalFeeByInvoiceId'](invoiceId))
            setFees(res.data)
        }

        loadInvoice()
        loadPrescription()
        loadFees()
        setAdd(false)
    }, [add])

    if (prescriptions === null || invoice === null || fees === null)
        return <Loading />

    if(add)
        return <Navigate to='/nurse/invoices' />

    return (<>
        <section className="content--payment" style={{ marginLeft: 15 }}>
            <h1 className="title" style={{ marginTop: '16px !important' }}>Invoice</h1>
            <div>
                <p>{invoice.medicalRecordId.patientId.fullName}</p>
                <p>{invoice.medicalRecordId.patientId.address}</p>
                <p>{invoice.medicalRecordId.patientId.phone}</p>
                <p>{invoice.medicalRecordId.patientId.email}</p>
            </div>
            <article>
                <h1>Recipient</h1>
                <table className="meta">
                    <tr>
                        <th><span>Invoice #</span></th>
                        <td><span>{invoice.id}</span></td>
                    </tr>
                    <tr>
                        <th><span>Ngày Thực Hiện</span></th>
                        <td><span>{new Date(invoice.createDate).toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' })}</span></td>
                    </tr>
                    {invoice.nurseId !== null ?
                        <tr>
                            <th><span>Y Tá Thanh Toán</span></th>
                            <td></td>
                        </tr> : <span></span>}
                </table>
                <table className="inventory">
                    <thead>
                        <tr>
                            <th><span>Tên Thuốc</span></th>
                            <th><span>Liều Lượng</span></th>
                            <th><span>Tần suất dùng thuốc</span></th>
                            <th><span>Thời gian sử dụng</span></th>
                            <th><span>Số Lượng</span></th>
                            <th><span>Thành tiền</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prescriptions.map(p => (
                                <tr>
                                    <td><a className="cut">-</a><span>{p[0]}</span></td>
                                    <td><span>{p[1]}</span></td>
                                    <td><span>{p[2]}</span></td>
                                    <td><span>{p[3]}</span></td>
                                    <td><span>{p[4]}</span></td>
                                    <td><span>{p[5]}</span> VNĐ</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <table className="balance">
                    <tr>
                        <th><span>Tổng tiền thuốc</span></th>
                        <td><span>{fees[1]}</span> VNĐ</td>
                    </tr>
                    <tr>
                        <th><span>Tiền Khám Bệnh</span></th>
                        <td><span>{fees[0]}</span> VNĐ</td>
                    </tr>
                    <tr>
                        <th><span>Tiền Phải Trả</span></th>
                        <td><span>{fees[0] + fees[1]}</span> VNĐ</td>
                    </tr>
                </table>
            </article>
            {invoice.nurseId === null?<Button variant='success' onClick={() => payment()}>Thanh Toán</Button>:<span></span>}
        </section >
    </>)
}
export default DetailInvoice