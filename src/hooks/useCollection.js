import  {useState,useEffect, useRef} from 'react';

 import { projectFirestore } from "../firebase/config"


export const useCollection = (collection, _query, _orderBy) =>{
    const [documents, setDocuments] = useState(null)
    const [error, setError]  = useState(null)


    // if we dont use the useRef then inifinity loop is going to occur in the useEffect
    // _query is an array and is 'different' on every function call
    const query = useRef(_query).current

    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

        const unsub = ref.onSnapshot((snapShot) => {
            let results =[]
            snapShot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            //update
            setDocuments(results)
            setError(null)

        }, (error) =>{
            console.log(error)
            setError('could not fetch the data')
        })

        // unsub

        return () => unsub()
    }, [collection, query, orderBy])

    return {documents, error}
}