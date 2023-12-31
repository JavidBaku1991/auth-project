import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
const currentUser=useSelector(state=>state.user);

  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold'>AUTH APP</h1>
        </Link>
        
        <ul className='flex gap-4'>
          <Link to='/home'>  <li>Home</li> </Link> 
          <Link to='/about'>  <li>About</li> </Link> 
          <Link to='/profile'> 
          {currentUser ? (
            <p>Profile</p>
):
             (<li>Sign In</li> )
          }
          </Link> 
           
        </ul>
      </div>
    </div>
  )
}
