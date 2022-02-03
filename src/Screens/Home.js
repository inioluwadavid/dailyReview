
import React from 'react'
import Input from '../component/Input'
import Summary from '../component/Summary'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import Scroll from "../component/Scroll"
import Scrolldown from "../component/Scrolldown"
export default function Home() {
    const { user } = useAuthContext()
    const {documents, error} = useCollection(
        'myReviews',
        ["uid","==",user.uid],
        ["createdAt", "desc"]
        )

    return (
        <div className='home-content container'>
            <Scroll />
            <Scrolldown />
           <div className='side-form col'>
                <Input uid = {user.uid} />
           </div>
           <div className='content col'>
                {error && <p>{error}</p>}
                {documents && <Summary summarys = {documents} />}
           </div>
        </div>
    )
}
