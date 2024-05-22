'use client'
import {signIn} from "next-auth/react"
import React from 'react'
import { useRouter } from "next/navigation";
const page = () => {
    const router = useRouter();


    return (
       <>
            <div className='mt-5 '>
                <button className='py-1 px-2 bg-blue w-[100%] border-0 rounded-md' onClick={()=> signIn("google") && router.replace("/")}>Sign up with Google</button>
            </div>
           
       </>
     
    )
}

export default page