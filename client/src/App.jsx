import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile.jsx';
import Header from "./components/Header";
import Private from "./components/Private";
export default function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/home' element={<Home />}></Route>
    <Route path='/about' element={<About />}></Route>
    <Route path='/signin' element={<SignIn />}></Route>
    <Route path='/signup' element={<SignUp />}></Route>
    <Route element={<Private />}>
      <Route path='/profile' element={<Profile />}></Route>
    </Route>
    
  </Routes>
  </BrowserRouter>
  )
}
