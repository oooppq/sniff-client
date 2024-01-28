import React from 'react';
import Header from '@/components/matchingtest/Header';
import Test from '@/components/matchingtest/Test';
import More from '@/components/matchingtest/More';

const Page = () => {
  return (
    <div className="mx-3">
      <Header />
      <Test />
      <More />
    </div>
  );
};

export default Page;
