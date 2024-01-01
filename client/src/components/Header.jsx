import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
const currentUser=useSelector(state=>state.user);

  return (
    <div className="navbar" >
      <div className='flex justify-between items-center  mx-auto p-5 '>
        <Link to='/'>
        <h1 className='font-bold '>AUTH APP</h1>
        </Link>
        
        <ul className='flex gap-4'>
          <Link to='/home'>  <li className="navbar-link">Home</li> </Link> 
          <Link to='/about'>  <li className="navbar-link">About</li> </Link> 
          <Link to='/signup'>  <li className="navbar-link">Signup</li> </Link> 
          <Link to='/profile'> 

          {currentUser ? (
            <p className="navbar-link">Profile</p>
):
             (<li className="navbar-link">Sign In</li> )
          }
          </Link> 
           
        </ul>
      </div>
    </div>
  )
}
