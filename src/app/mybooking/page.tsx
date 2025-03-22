'use client'
import { useSession } from "next-auth/react"

const page = () => {

    const { data:session } = useSession();
    if(!session){
        
    }

  return (
    <div>page</div>
  )
}

export default page