import { PreviousIcon } from '@/public/images';
import { useRouter } from 'next/navigation';

interface SliderProps {
  swiperRef: React.RefObject<any>;
}
const SwiperHeader = ({ swiperRef }: SliderProps) => {
  const router = useRouter();

  const handlePrev = () => {
    if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
      const swiperIndex = swiperRef.current.swiper.activeIndex;
      if (swiperIndex === 0) {
        router.push('/');
      } else {
        swiperRef.current.swiper.slidePrev();
      }
    }
  };
  return (
    <div className="flex items-center w-full max-w-[430px] h-[54px] pt-[13px] pl-[10px] pr-[13px] pb-[11px] bg-acodewhite z-30">
      <button type="button" className="mr-auto" onClick={handlePrev}>
        <PreviousIcon className="" />
      </button>
    </div>
  );
};

export default SwiperHeader;
