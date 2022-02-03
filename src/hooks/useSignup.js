import {useEffect, useState } from 'react'
import { projectAuth } from "../firebase/config"
import { useAuthContext } from './useAuthContext';

export const useSignup = () =>{
    const [isCanceled, setIsCanceled] = useState(false)
    const[error, setError] = useState(null);
    const[isPending, setIsPending] =useState(false)
    const {dispatch} = useAuthContext()


    const signup = async (email, password, displayName) => {
            setError(null)
            setIsPending(true)

            try{
                //signup user
                const res=   await projectAuth.createUserWithEmailAndPassword(email, password)
                

                // throw an error
                if(!res){
                    throw new Error(" Could not complete Signup")
                }
                //add displayName to user
                await res.user.updateProfile({displayName: displayName})


                //dispatch login action
                dispatch({type: 'LOGIN', payload: res.user})

                if(!isCanceled){
                    setIsPending(false)
                    setError(null)
                }
                
            }
            catch(err){
                if(!isCanceled){
                    console.log(err.message)
                    setIsPending(false)
                    setError(err.message)
                }
                
            }
    }
    useEffect(() =>{
        return () => setIsCanceled(true)
    }, [])

return { error, isPending, signup}
}