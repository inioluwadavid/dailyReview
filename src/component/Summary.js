
import React from 'react';
import { useFirestore } from '../hooks/useFirestore';
import {motion } from "framer-motion"
import deleteIcon from "../images/delete.svg"
const headVarients = {
  hidden:{
    y: -250
  },
  visible:{
    y: 0,
    transition:{
      duration: 1.5
      
    }
  },
  whileHover:{
    boxShadow:"0px 6px 8px rgb(255,255,255)",
    originX: 0,
    transition:{
      type: 'spring', 
      stiffness: 30
    }
  }
}
export default function Summary({ summarys }) {
    const {deleteDocument } = useFirestore('myReviews')
    
  return <div className='summary-content'>
            {summarys.map((summary) =>{
           return     <motion.div 
                        className='summary-sub'
                        variants={headVarients}
                        initial ='hidden'
                         animate='visible'
                         whileHover='whileHover'
                         key={summary.id}>
                    <h1>{summary.topic}</h1>
                    <p>{ summary.summary}</p>
                    <p>Date: {summary.date}</p>
                    <button onClick={() => deleteDocument(summary.id)}><img src={deleteIcon} alt="delete icons"/></button>
                </motion.div>
            })}
  </div>;
}
