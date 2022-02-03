
import React, {useState} from 'react'
import { useSignup } from '../hooks/useSignup';
import { motion } from "framer-motion"
import {Link} from "react-router-dom"
import eyeIcon from "../images/eye.svg"
import eyeOffIcon from "../images/eyeOff.svg"


const headVarients = {
  hidden:{
    y: -250
  },
  visible:{
    y: 0,
    transition:{
      duration: 0.5
    }
  }
}

const formVarient= {
  hidden:{
    x: '100vw'
  },
  visible:{
    x: 0,
    transition:{
      type:'spring', 
      delay:1,
       duration: 2,
        stiffness: 20
    }
  }
}
export default function Signup() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [eye, setEye] = useState(false)
    // value returned from the signup hook
    const { signup, isPending, error } = useSignup()
    const seePassword = () =>{
      
      var x = document.getElementById("exampleInputPassword1");
        if (x.type === "password") {
               x.type = "text";
               setEye(true)
          } else {
             x.type = "password";
             setEye(false)
        }

       }
    const handleSubmit = (e) =>{
        e.preventDefault()
        signup(email, password, displayName)
    }
    return (
        <div className='container signup-page'>
           <motion.h1
           variants={headVarients}
           initial ='hidden'
           animate='visible'
           >Signup</motion.h1>

            <motion.form
             onSubmit={handleSubmit}
             variants={formVarient}
             initial ='hidden'
             animate='visible' 
             novalidate>
            <div className="mb-3">
             <label  className="form-label">Full Name</label>
             <input type="text" 
             className="form-control" 
             
             onChange={(e) => setDisplayName(e.target.value)}
             value={displayName}
             required
               />

             </div>
              <div className="mb-3">
             <label for="exampleInputEmail1" className="form-label">Email address</label>
             <input type="email" 
             className="form-control" 
             id="exampleInputEmail1"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
              aria-describedby="emailHelp"
               required
               />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
             </div>
                <div className="mb-3">
                 <label for="exampleInputPassword1" className="form-label">Password</label>
                 <div class="input-group mb-3">
                 <input type="password"
                  className="form-control" 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="exampleInputPassword1" 
                  aria-describedby="basic-addon2"
                  required
                  />
                  <span class="input-group-text" onClick={seePassword} id="basic-addon2"><img src={eye  ? eyeIcon : eyeOffIcon} alt='eye icons'/></span>
                  </div>
                </div>
                
                {!isPending && <button type="submit" className="btn "
                
                 >Login</button> }
                
                
                {isPending && <button 
                type="submit" 
                className="btn "
                
                 disabled >Loading ...</button>}
                 <p className='signup-link'><Link to="/login">Already have an account?</Link></p>
                {error && <p className= 'error'>{error}</p>}
            </motion.form>
        </div>
    )
}
