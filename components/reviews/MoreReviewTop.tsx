import {
  SmallRedHalfStar,
  SmallRedFullStar,
  SmallRedEmptyStar,
} from '@/public/images';

interface MoreReviewTopProps {
  reviewCnt: number;
  rateSum: number;
}

const MoreReviewTop = ({ reviewCnt, rateSum }: MoreReviewTopProps) => {
  const averageRating = rateSum / reviewCnt;
  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return (
    <div className="flex items-center mb-11">
      <div className="text-[18px] font-medium leading-[18px] tracking-[-0.45px] text-acodeblack mr-4">
        리뷰 {reviewCnt}개
      </div>
      <div className="flex items-center mb-[4px]">
        {Array.from({ length: fullStars }, (_, i) => (
          <SmallRedFullStar key={i} />
        ))}
        {halfStar > 0 && <SmallRedHalfStar />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <SmallRedEmptyStar key={i} />
        ))}
      </div>
    </div>
  );
};

export default MoreReviewTop;
