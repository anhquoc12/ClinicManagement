import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import Loading from "../layout/Loading"
import { authAPI, endpoints } from "../configs/Apis"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

const Medicines = () => {
    const [medicines, setMedicines] = useState(null)
    const [q] = useSearchParams()
    const nav = useNavigate()
    const [keyword, setKeyword] = useState()
    const [categories, setCategories] = useState(null)
    const [isName, setIsName] = useState(false)
    const [remove, setRemove] = useState(false)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [units, setUnits] = useState(null)
    const [medicine, setMedicine] = useState({
        "name": "",
        "unitInStock": "",
        "unitPrice": "",
        "categoryId": "",
        "unitMedicineId": ""
    })
    const [complete, setComplete] = useState(false)
    const [id, setId] = useState(null)


    const search = (evt) => {
        evt.preventDefault()
        if (!isName)
            nav(`/admin/medicine/list/?cate=${keyword}`)
        else
            nav(`/admin/medicine/list/?name=${keyword}`)
    }

    const deleteMedicne = (item) => {
        const process = async () => {
            /* eslint-disable no-restricted-globals */
            if (confirm('Bạn muốn xoá không') === true) {
                let res = await authAPI().delete(endpoints['deleteMedicine'](item))
                alert(res.data)
            }
        }

        process()
        setRemove(true)
    }

    const updateMedicine = async (item) => {
        let i = 0
        try {
            alert(i++)
            setLoading(true)
            alert(i++)
            let form = new FormData()
            alert(i++)
            let test = (await authAPI().get(endpoints['medicine'](item)))
            let medicineForm = test.data
            alert(i++)
            for (let field in medicine)
                change(field, medicineForm[field])
                alert(i++)
            for (let field in medicine) {
                if (medicine[field] === undefined && (field === 'category' || field === 'unit'))
                    form.append(field, '1')
                else
                    form.append(field, medicineForm[field])
            }
            let res = await authAPI().post(endpoints['unitMedicines'](id), form)
            alert('Sửa thành công')
            setComplete(true)
        } catch (ex) {
            alert('Có lỗi xảy ra 123ss')
        } finally {
            setLoading(false)
            setUpdate(true)
            handleClose()
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = async (medicineId) => {
        let { data } = (await authAPI().get(endpoints['medicine'](medicineId)))
        let medicineForm = data
        setId(medicineId)
        for (let field in medicine)
            change(field, medicineForm[field])
        setShow(true)
    }

    const change = (field, value) => {
        setMedicine(current => {
            return { ...current, [field]: value }
        })
    }

    useEffect(() => {
        const loadMedicine = async () => {
            let res = await authAPI().get(endpoints['medicines'])

            let kwName = q.get('name')
            let kwCate = q.get('cate')

            if (kwName !== null) {
                res = await authAPI().get(`${endpoints['medicines']}?name=${kwName}`)
            }
            if (kwCate !== null) {
                res = await authAPI().get(`${endpoints['medicines']}?cate=${kwCate}`)
            }
            setMedicines(res.data)
        }

        const loadCategory = async () => {
            let res = await authAPI().get(endpoints['categories'])
            setCategories(res.data)
        }

        const loadUnitMedicines = async () => {
            let res = await authAPI().get(endpoints['unitMedicines'])
            setUnits(res.data)
        }

        loadMedicine()
        loadCategory()
        loadUnitMedicines()
        setRemove(false)
        setUpdate(false)
    }, [q, remove])

    if (medicines === null || categories === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">Danh sách thuốc</h1>
            <Container>
                <Row>
                    <Col xs={12} md={5}>
                        <Form onSubmit={search} className="mt-5">
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Tìm Kiếm theo tên
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" placeholder="Search..." onChange={e => setKeyword(e.target.value)} />
                                </Col>
                                <Col sm="3">
                                    <Button type="submit" variant="info" onClick={e => setIsName(true)}>Tìm kiếm</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12} md={5}>
                        <Form onSubmit={search} className="mt-5">
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="5">
                                    Tìm Kiếm theo danh mục
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Select onChange={e => setKeyword(e.target.value)}>
                                        {categories.map(c => (
                                            <option value={c.id}>{c.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col sm="3">
                                    <Button type="submit" variant="info" onClick={e => setIsName(false)}>Tìm kiếm</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12} md={2}>
                        <Link to='/admin/medicine/add-medicine' className="btn btn-success mt-5">Thêm Thuốc</Link>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên Thuốc</th>
                        <th>Đơn Giá</th>
                        <th>Số Lượng</th>
                        <th>Loại</th>
                        <th>Đơn vị thuốc</th>
                        <th colSpan="2" style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        medicines.map(m => (
                            <tr>
                                <td>{m.id}</td>
                                <td>{m.name}</td>
                                <td>{m.unitPrice}</td>
                                <td>{m.unitInStock}</td>
                                <td>{m.categoryId.name}</td>
                                <td>{m.unitMedicineId.name}</td>
                                <td><Button variant="warning" onClick={(evt) => handleShow(evt, 3)}>Cập nhật</Button></td>
                                <td><Button variant="danger" onClick={() => deleteMedicne(m.id)}>Xoá</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin Thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tên Thuốc</Form.Label>
                            <Form.Control type="text" value={medicine['name']} onChange={(evt) => change(evt, 'name')} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Số Lượng</Form.Label>
                            <Form.Control type="number" value={medicine['unitInStock']} min={0} onChange={(evt) => change(evt, 'unitInStock')} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Đơn Giá</Form.Label>
                            <Form.Control type="number" value={medicine['unitPrice']} onChange={(evt) => change(evt, 'unitPrice')} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Loại Thuốc</Form.Label>
                            <Form.Select value={medicine['categoryId']['id']} onChange={(evt) => change(evt, 'categoryId')}>
                                {
                                    categories.map(c => (
                                        <option value={c.id}>{c.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Đơn Vị</Form.Label>
                            <Form.Select onChange={(evt) => change(evt, 'unit')} value={medicine['unitMedicineId']['id']}>
                                {units.map(u => (
                                    <option value={u.id}>{u.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    {loading && <Loading />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default Medicines