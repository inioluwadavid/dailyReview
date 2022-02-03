
import React from 'react'
import { NavLink } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from '../hooks/useAuthContext'


export default function Navbar() {
  
  const { logout } = useLogout()
  const {user, mode} = useAuthContext()
  
     // to render the greetings  
      const myDate = new Date()
      const hrs = myDate.getHours()
    return (
        <div className={`${mode}`}>
         

            <nav className="navbar navbarr navbar-expand-lg navbar-light " >
             <div className="container-fluid">
                  <NavLink className="navbar-brand nav-c" style={{ paddingLeft:"2em", fontWeight:"900"}} to="/">DailyReview</NavLink>
                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                    </button>
                 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                 <div className="navbar-nav" style={{marginLeft: "auto", paddingRight:"2em"}}>
                 {!user && (
                   <>
                      <NavLink className="nav-link nav-c"  to="/login">Login</NavLink>
                      <NavLink className="nav-link nav-c"  to="/signup">Signup</NavLink>
                   </>
                 )}
             </div>
              <div className='navbar-nav'>
              {user && (
                <>
                 <li className="nav-link nav-c"  >{ hrs >=12 ? hrs >= 16 ? <>Good Evening </> : <>Good Afternoon</> : <>Good Morning</>}, {user.displayName}</li>
                 <li className='btn'  onClick={ logout } >Logout</li>
                </>
                
              )}
              
              </div>
                </div>
              </div>
            </nav>
        </div>
    )
}
