
import React,{useState} from 'react'
import { useLogin } from '../hooks/useLogin';
import {Link} from "react-router-dom"
import { motion } from "framer-motion"


import eyeIcon from "../images/eye.svg"
import eyeOffIcon from "../images/eyeOff.svg"


const headVarients = {
  hidden:{
    y: -250
  },
  visible:{
    y: -10,
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

export default function Login() {
  const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [eye, setEye] = useState(false)
    const {login, error, isPending } = useLogin()


    const handleSubmit = (e) =>{
        e.preventDefault()
        login (email, password)
    }
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
    return (
        <div  className='login-page'>
        <motion.h1 
        variants={headVarients}
         initial ='hidden'
         animate='visible'
        
        >Login</motion.h1>
        <motion.form 
          onSubmit={handleSubmit}
          variants={formVarient}
          initial ='hidden'
          animate='visible'
          novalidate
          
          >
              <div className="mb-3">
             <label for="exampleInputEmail1" className="form-label">Email address</label>
             <motion.input type="email" 
             className="form-control" 
             id="exampleInputEmail1"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
              aria-describedby="emailHelp"
              whileHover= {{scale:1, originX: 0}} 
              transition={{type: 'spring', stiffness: 300}}
              required
               />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
             </div>
                <div className="mb-3">
                 <label for="exampleInputPassword1" className="form-label">Password</label>
                 <div class="input-group mb-3">
                 <motion.input type="password"
                  className="form-control" 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="exampleInputPassword1"
                  whileHover= {{scale:1, originX: 0}} 
                  transition={{type: 'spring', stiffness: 300}}
                  required

                  />
                    <span class="input-group-text" onClick={seePassword} id="basic-addon2"><img src={eye  ? eyeIcon : eyeOffIcon} alt='eye icons'/></span>
                    </div>
                </div>
                {isPending && <button type='submit' className='btn' disabled>Loading ...</button>}
                {!isPending &&  <button type="submit" className="btn ">Login</button> }
                <p className='signup-link'><Link to="/signup">Signup with us</Link></p>
            </motion.form>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}
