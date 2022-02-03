
import React, {useState, useEffect} from 'react'
import { useFirestore } from '../hooks/useFirestore';
import { motion } from "framer-motion"

const formVarient= {
    hidden:{
      x: '100vw'
    },
    visible:{
      x: 0,
      transition:{
        type:'spring', 
        delay:0.5,
         duration: 2,
          stiffness: 20
      }
    }
  }

export default function Input({ uid }) {
    const [summary, setSummary] = useState("");
    const [topic, setTopic] = useState("")
    const [date, setDate] = useState("")
    const {addDocument, response } = useFirestore('myReviews')

    const handleSubmit = (e) =>{
        e.preventDefault()
        addDocument({
            uid: uid,
            topic,
             summary, 
             date
            })
    }
   
    useEffect(() =>{
        if(response.success){
            setTopic("")
            setSummary("")
            setDate("")
        }
    },[response.success])
    return (
        <div className='cont'>
            <motion.form 
            onSubmit={handleSubmit}
            variants={formVarient}
            initial ='hidden'
            animate='visible'
             novalidate>
              <div className="mb-3">
             <label className="form-label">Topic</label>
             <input type="text" 
             className="form-control" 
            
             onChange={(e) => setTopic(e.target.value)}
             value={topic}
             required
              />
               
             </div>
             <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Review of your day</label>
                 <textarea class="form-control" 
                 id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setSummary(e.target.value)}
                  value={summary}
                  required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                 <label className='form-label'>Date</label>
                 <input 
                     className='form-control'
                     type="date"
                     onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                 />

                 
                </div>
  
                <button type="submit" className="btn ">Submit</button>
            </motion.form>
        </div>
    )
}

