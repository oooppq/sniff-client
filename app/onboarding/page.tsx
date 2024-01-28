import React from 'react';
import Slider from '@/components/onboardingpage/Slide';
import Slide1 from '@/components/onboardingpage/Slide1';
import Slide2 from '@/components/onboardingpage/Slide2';
import Slide3 from '@/components/onboardingpage/Slide3';

const Page = () => {
  const slides = [
    { name: 'slide1', component: <Slide1 /> },
    { name: 'slide2', component: <Slide2 /> },
    { name: 'slide3', component: <Slide3 /> },
  ];
  return (
    <Slider
      slides={slides.map((slide) => slide.component)}
      keys={slides.map((slide) => slide.name)}
    />
  );
};

export default Page;
