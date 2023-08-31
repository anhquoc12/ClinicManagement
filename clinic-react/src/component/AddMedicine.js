import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { authAPI, endpoints } from "../configs/Apis"
import Loading from "../layout/Loading"
import { Navigate } from "react-router-dom"

const AddMedicine = () => {
    const [categories, setCategories] = useState(null)
    const [units, setUnits] = useState(null)
    // const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [complete, setComplete] = useState(false)
    const [medicine, setMedicine] = useState({
        "name": "",
        "stock": "",
        "price": "",
        "category": "",
        "unit": ""
    })

    const change = (evt, field) => {
        setMedicine(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    const addMedicine = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                setLoading(true)
                let form = new FormData()
                for (let field in medicine)
                    form.append(field, medicine[field])
                let res = await authAPI().post(endpoints['addMedicine'], form)
                alert("Thêm thành công")
                setComplete(true)
            } catch (ex) {
                alert("Có lỗi xảy ra 123")
            } finally {
                setLoading(false)
            }
        }

        process()
    }

    useEffect(() => {
        const loadCategories = async () => {
            let res = await authAPI().get(endpoints['categories'])
            setCategories(res.data)
        }

        const loadUnitMedicines = async () => {
            let res = await authAPI().get(endpoints['unitMedicines'])
            setUnits(res.data)
        }

        loadCategories()
        loadUnitMedicines()
    }, [])

    if(complete)
        return <Navigate to='/admin/medicine/list' />

    if (categories === null || units === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">Thêm Thuốc</h1>
            <Form className="content" onSubmit={(evt) => addMedicine(evt)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tên Thuốc</Form.Label>
                    <Form.Control type="text" onChange={(evt) => change(evt, 'name')} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control type="number" min={0} onChange={(evt) => change(evt, 'stock')} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Đơn Giá</Form.Label>
                    <Form.Control type="number" onChange={(evt) => change(evt, 'price')} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Loại Thuốc</Form.Label>
                    <Form.Select onChange={(evt) => change(evt, 'category')}>
                        {
                            categories.map(c => (
                                <option value={c.id}>{c.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Đơn Vị</Form.Label>
                    <Form.Select onChange={(evt) => change(evt, 'unit')}>
                        {units.map(u => (
                            <option value={u.id}>{u.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {loading && <Loading />}
                <Button variant="primary" type="submit">Thêm thuốc</Button>
            </Form>
        </>
    )
}

export default AddMedicine