'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AcodeLogo } from '@/public/images';

const Onboard = () => {
  const [isDone, setIsDone] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const doneTimer = setTimeout(() => {
      setIsDone(true);
    }, 1000);

    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 1500);

    return () => {
      clearTimeout(doneTimer);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div
      className={` min-h-screen flex justify-center items-center transition duration-700 ${
        isDone ? 'bg-acodewhite' : 'bg-acodeblack'
      }`}
    >
      <AcodeLogo className={`transition ${isDone ? 'invisible' : ''}`} />
    </div>
  );
};

export default Onboard;
