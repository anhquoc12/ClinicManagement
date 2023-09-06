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
                    {user !== null && user.userRole === 'ADMIN' ? <>
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
                        
                        <Link to='/admin/stats' className='nav-item nav-link'>Thống kê - báo cáo</Link>
                    </> : <span></span>
                    }
                    {/* <Nav.Link href="#home">Trang Chủ</Nav.Link> */}
                    {user !== null && user.userRole === 'PATIENT' ? <>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to='/appointment' className='nav-item nav-link'>Đăng Ký lịch khám</Link>
                                <Link to='/list-appointment' className='nav-item nav-link'>Lịch sử đăng ký</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </> : <span></span>
                    }
                    {user !== null && user.userRole === 'NURSE' ?
                        <>
                            <NavDropdown title="Lịch Khám" id="basic-nav-dropdown">
                                <Link className='dropdown-item' to='/nurse/list-today'>Lịch Khám hôm nay</Link>

                                <Link className='dropdown-item' to='/nurse/un-confirmed'>Cần được xác nhận</Link>
                            </NavDropdown>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Link to='/schedule/view' className='nav-item nav-link'>Lịch Trực</Link>
                                    <Link to='/nurse/invoices' className='nav-item nav-link'>Thanh Toán</Link>
                                </Nav>
                            </Navbar.Collapse>
                        </> : <span></span>}
                        {user !== null && user.userRole === 'DOCTOR' ?
                        <>
                            <NavDropdown title="Khám Bệnh" id="basic-nav-dropdown">
                                <Link className='dropdown-item' to='/doctor/medical'>Phiếu Khám</Link>

                                <Link className='dropdown-item' to='/doctor/history/list'>Lịch sử Khám</Link>
                            </NavDropdown>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Link to='/schedule/view' className='nav-item nav-link'>Lịch Trực</Link>
                                </Nav>
                            </Navbar.Collapse>
                        </> : <span></span>}

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