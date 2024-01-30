import { EditIcon } from '@/public/images';
import Link from 'next/link';

interface Props {
  id: string;
}

const AddReview = ({ id }: Props) => {
  return (
    <div
      className="fixed bottom-3 z-50 bg-white py-2 px-4 rounded-full flex items-center justify-center space-x-2 border-2 border-white "
      style={{
        boxShadow: '0px 2px 17px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Link href={`/perfumes/${id}/reviews/new`}>
        <button type="button" className="flex items-center">
          <EditIcon className="mr-2" />
          <div className="body2 text-center flex-1">리뷰 남기기</div>
        </button>
      </Link>
    </div>
  );
};

export default AddReview;
