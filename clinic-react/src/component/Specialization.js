import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"

const Specialization = () => {
    const [specializations, setSpecializations] = useState(null)
    const [remove, setRemove] = useState(false)
    const [add, setAdd] = useState(false)
    const [name, setName] = useState(null)

    const deleteItem = async (item) => {
        try {
            /* eslint-disable no-restricted-globals */
            if(confirm('Bạn có muốn xoá?') === true) {
                let res = await authAPI().delete(endpoints['deleteSpecialization'](item))
                alert(res.data)
            }
        } catch(ex) {
            alert('Có lỗi xảy ra!!!')
        }
        setRemove(true)
    }

    const addItem = async () => {
        try {
            let res = await authAPI().post(endpoints['addSpecialization'], {
                "name": name
            })
            alert("Thêm thành công")
        } catch(ex) {
            alert('Có lỗi xảy ra!!!')
        }
        setAdd(true)
    }

    useEffect(() => {
        const loadCategories = async () => {
            let res = await authAPI().get(endpoints['specializations'])
            setSpecializations(res.data)
        }

        loadCategories()
        setRemove(false)
        setAdd(false)
    }, [remove, add])

    if (specializations === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">Chuyên Khoa</h1>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Col sm="2"></Col>
                    <Form.Label column sm="2">
                        Thêm Khoa
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="text" onChange={evt => setName(evt.target.value)} />
                    </Col>
                    <Col sm="2">
                    <Button variant="primary" onClick={() => addItem()}>Thêm Khoa</Button>
                    </Col>
                </Form.Group>
                
            </Form>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên Loại Thuốc</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {specializations.map(s => (
                        <tr>
                            <td style={{ width: '10%' }}>{s.id}</td>
                            <td style={{ width: '80%' }}>{s.name}</td>
                            <td style={{ width: '10%' }}><Button variant="danger" onClick={() => deleteItem(s.id)} style={{ width: '100%' }}>Xoá</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Specialization