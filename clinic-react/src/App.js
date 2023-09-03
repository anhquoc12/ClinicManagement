
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Registers from './component/Registers';
import Home from './component/Home'
import Registers from './component/Registers';
import Login from './component/Login';
import { createContext, useReducer } from 'react';
import MyUserReduce from './reducers/MyUserReduce';
import Patients from './component/Patients';
import cookie from "react-cookies";
import Nurses from './component/Nurses';
import AddNurse from './component/AddNurse';
import Doctor from './component/Doctor';
import AddDoctor from './component/AddDoctor';
import Medicines from './component/Medicines';
import AddMedicine from './component/AddMedicine';
import Category from './component/Category';
import UnitMedicine from './component/UnitMedicine';
import Schedule from './component/Schedule';
import AddSchedule from './component/AddSchedule';
import Specialization from './component/Specialization';
import Room from './component/Room';
import RegisterAppointment from './component/RegisterAppointment';
import ListAppointment from './component/ListAppointment';
import UnConfirmed from './component/UnConfirmed';
import TodayAppointment from './component/TodayAppointment';
import History from './component/History';

export const MyUserContext = createContext();

function App() {
  const [user, state] = useReducer(MyUserReduce, cookie.load('user')  || null)


  return (
    <>
      <MyUserContext.Provider value={[user, state]}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Registers />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin/users/patients' element={<Patients />} />
            <Route path='/admin/users/nurses' element={<Nurses />} />
            <Route path='/admin/users/nurse' element={<AddNurse />} />
            <Route path='/admin/users/doctors' element={<Doctor />} />
            <Route path='/admin/users/doctor' element={<AddDoctor />} />
            <Route path='/admin/medicine/list' element={<Medicines />} />
            <Route path='/admin/medicine/add-medicine' element={<AddMedicine />} />
            <Route path='/admin/medicine/categories' element={<Category />} />
            <Route path='/admin/medicine/units' element={<UnitMedicine />} />
            <Route path='/schedule/view' element={<Schedule />} />
            <Route path='/schedule/add' element={<AddSchedule />} />
            <Route path='/admin/specialization' element={<Specialization />} />
            <Route path='/admin/room' element={<Room />} />
            <Route path='/appointment' element={<RegisterAppointment />} />
            <Route path='/list-appointment' element={<ListAppointment />} />
            <Route path='/nurse/un-confirmed' element={<UnConfirmed />} />
            <Route path='/nurse/list-today' element={<TodayAppointment />} />
            <Route path='/doctor/history/list' element={<History />} />
          </Routes>
        </BrowserRouter>
      </MyUserContext.Provider>
    </>
  );
}

export default App;
