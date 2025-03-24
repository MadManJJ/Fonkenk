'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css';

export default function Banner() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className={`${styles.banner} relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16 px-4`}>
      {/* Background image removed, added gradient for a modern look */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50 z-0"></div>

      <div className="relative z-10 text-white text-center space-y-4">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Relax and Rejuvenate with Our Massage Services
        </h1>
        <h3 className="text-xl md:text-2xl max-w-3xl mx-auto">
          Book a massage today and experience ultimate relaxation, personalized just for you.
        </h3>
      </div>

      {session && (
        <div className="z-30 absolute top-5 right-10 font-semibold text-cyan-200 text-lg shadow-md px-4 py-2 bg-black bg-opacity-50 rounded-lg">
          Welcome, {session.user?.email}
        </div>
      )}
    </div>
  );
}
