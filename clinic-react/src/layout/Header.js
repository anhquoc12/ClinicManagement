import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate } from 'react-router-dom';
import MyUserReduce from '../reducers/MyUserReduce';
import { Button, NavDropdown } from 'react-bootstrap';
import { MyUserContext } from '../App';

const Header = () => {
    const [user, state] = useContext(MyUserContext)
    const [exit, setExit] = useState(false)
    const logout = () => {
        state({
            'Type': 'logout'
        })
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Clinic Website</Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link href="#home">Trang Chủ</Nav.Link> */}
                    <Link to='/' className='nav-item nav-link'>Trang chủ</Link>
                    {user !== null && user.userRole === 'ADMIN'?<>
                    <NavDropdown title="User" id="basic-nav-dropdown">
                        <Link className='dropdown-item' to='/admin/users/patients'>Bệnh Nhân</Link>
                        
                        <Link className='dropdown-item' to='/admin/users/doctors'>Bác Sỹ</Link>
                        <Link className='dropdown-item' to='/admin/users/nurses'>Y Tá</Link>
                    </NavDropdown>
                    <NavDropdown title="Thuốc" id="basic-nav-dropdown">
                    <Link className='dropdown-item' to='/admin/medicine/list'>Thuốc</Link>
                    
                    <Link className='dropdown-item' to='/admin/medicine/units'>Đơn Vị thuốc</Link>
                    <Link className='dropdown-item' to='/admin/medicine/categories'>Loại Thuốc</Link>
                </NavDropdown>
                <NavDropdown title="Lịch trực phòng" id="basic-nav-dropdown">
                    <Link className='dropdown-item' to='/schedule/view'>Lịch trực</Link>
                    
                    <Link className='dropdown-item' to='/admin/room'>Phòng trực</Link>
                    <Link className='dropdown-item' to='/admin/specialization'>Chuyên Khoa</Link>
                </NavDropdown>
                </>:<span></span>
                    }
                    
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {/* <Link to="/register" className='btn btn-danger'>Đăng Ký</Link>
                    <Link to="/login" className='btn btn-success'>Đăng Nhập</Link> */}
                    {user === null || user === undefined ? <>
                        <Link to="/register" className='btn btn-danger'>Đăng Ký</Link>
                        <Link to="/login" className='btn btn-success'>Đăng Nhập</Link>
                    </> : <>
                        <Link className="nav-link" to="/">Chào {user.fullName}</Link>
                        <Button onClick={logout} variant="secondary">Đăng xuất</Button>
                    </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header