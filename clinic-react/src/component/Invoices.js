import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
// import '../static/css/payment.css'

const Invoices = () => {
    const [invoices, setInvoices] = useState(null)

    useEffect(() => {
        const loadInvoices = async () => {
            let res = await authAPI().get(endpoints['invoices'])
            setInvoices(res.data)
        }

        loadInvoices()
    }, [])

    if (invoices === null)
        return <Loading />

    return (<>
        <section class="content--payment">
            <Badge pill bg="info" style={{ marginLeft: 110, marginBottom: 18, marginTop: 18 }}>Danh Sách hoá đơn</Badge>

            <table id="list-invoice" className="table align-middle mb-0 bg-white" style={{ marginBottom: '100px !important' }}>
                <thead className="bg-light">
                    <tr style={{ border: 'none !important' }}>
                        <th style={{ border: 'none !important' }}>Số hoá đơn</th>
                        <th style={{ border: 'none !important' }}>Người Trả</th>
                        <th style={{ border: 'none !important' }}>Ngày Trả</th>
                        <th style={{ border: 'none !important' }}>Tổng tiền</th>
                        <th style={{ border: 'none !important' }}>Trạng Thái</th>
                        <th style={{ border: 'none !important' }}></th>
                    </tr>
                </thead>
                <tbody style={{ border: '1px solid white !important' }}>
                    {
                        invoices.map(i => (
                            i[3] === 'ACCEPTED' ?
                                <tr className="table-success">
                                    <td style={{ border: 'none !important' }}>#INV-{i[0]}-{new Date(i[2]).toISOString().split('T')[0]}</td>
                                    <td style={{ border: 'none !important' }}>{i[1]}</td>
                                    <td style={{ border: 'none !important' }}>{i[2]}</td>
                                    <td style={{ border: 'none !important' }}>{i[4]}</td>
                                    <td style={{ border: 'none !important' }}><span class="badge bg-success">Đã Thanh Toán</span></td>
                                    <td style={{ border: 'none !important' }}><Link to={`/nurse/invoices/${i[0]}`} style={{textDecoration: 'none', fontSize: 14}}  className="text-danger">view details</Link></td>
                                </tr> :
                                <tr className="table-warning">
                                    <td style={{ border: 'none !important' }}>#INV-{i[0]}-{new Date(i[2]).toISOString().split('T')[0]}</td>
                                    <td style={{ border: 'none !important' }}>{i[1]}</td>
                                    <td style={{ border: 'none !important' }}>{i[2]}</td>
                                    <td style={{ border: 'none !important' }}>{i[4]}</td>
                                    <td style={{ border: 'none !important' }}><span class="badge bg-warning">Chưa Thanh Toán</span></td>
                                    <td style={{ border: 'none !important', borderBottom: 'none !important' }}><Link to={`/nurse/invoices/${i[0]}`} style={{textDecoration: 'none', fontSize: 14}} className="text-danger">view details</Link></td>
                                </tr>

                        ))
                    }
                </tbody>
            </table>
        </section>
    </>)
}

export default Invoices