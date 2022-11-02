import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import {useEffect} from "react";
import Chat from './pages/chat/Chat';

function App() {

  const {isAuth,user} = useSelector(state=>state.Auth)

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user))
  },[user])
  return (
    <div className="App">
      <BrowserRouter>
      <div className='blur' style={{top: '-18%', right: '0'}}></div>
      <div className='blur' style={{top: '36%', left: '-8%'}}></div>

      <Routes>
        <Route path='/' element={isAuth ? <Home/> : <Navigate to="/auth"/>}/>
        <Route path='/auth' element={!isAuth ? <Auth/> : <Navigate to="/"/>}/>
        <Route path='/profile/:id' element={isAuth ? <Profile/> : <Navigate to="/auth"/>}/>
        <Route path='/chat' element={isAuth ? <Chat/> : <Navigate to="/auth"/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
