import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Login from './Pages/Login'; // import the Login component
import { Routes, Route, useNavigate } from "react-router-dom";
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/Allbooks';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext.js"

function App() {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      {/* <div className="App"> */}
        <Routes>
          <Route exact path='/' element={<Home />} />

          <Route path='/signin' element= {user ? (user.isAdmin ? navigate('/dashboard@admin') : navigate('/dashboard@member')) : <Signin />} />

          {/* Add the Login route here */}
          <Route path='/login' element={user ? (user.isAdmin ? navigate('/dashboard@admin') : navigate('/dashboard@member')) : <Login />} />

          <Route path='/dashboard@member' element={user ? (user.isAdmin === false ? <MemberDashboard /> : navigate('/')) : navigate('/')} />

          <Route path='/dashboard@admin' element={user ? (user.isAdmin === true ? <AdminDashboard /> : navigate('/')) : navigate('/')} />

          <Route path='/books' element={<Allbooks />} />

        </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
