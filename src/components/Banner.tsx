'use client'
import styles from './banner.module.css';
import Image from 'next/image';
import  {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default function Banner () {
   
    
    const router = useRouter()
    const { data: session} = useSession()
    console.log(session?.user.token)

    return (
        <div className={styles.banner} >
            <Image src={'/img/massage.jpg'}
            alt='cover'
            fill={true}
            priority
            objectFit='cover'/> 
            <div className={styles.bannerText}>
            <h1 className='text-4xl font-medium'>Relax and Rejuvenate with Our Massage Services</h1>
            <h3 className='text-xl'>Book a massage today and experience ultimate relaxation, personalized just for you.</h3>

            </div>
            {
                session?<div className='z-30 absolute top-5 right-10 front-semibold text-cyan-800 text-lg'
                >Welcome {session.user?.email}</div>: null
            }
            
        </div>

    );
}