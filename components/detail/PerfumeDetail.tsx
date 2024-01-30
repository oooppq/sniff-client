import React from 'react';
import EachNote from './EachNote';
import PerfumeStats from './PerfumeStats';

interface PerfumeDetailProps {
  isEasy: boolean;
  id: string;
}

interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  acode: string;
}

async function getDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/fragrance/${id}/note`,
    { cache: 'no-cache' },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}

const PerfumeDetail = async ({ isEasy, id }: PerfumeDetailProps) => {
  const data = await getDetail(id);

  if (!data) return null;
  const key = isEasy ? 'acode' : 'ingredientName';

  const labels = isEasy
    ? { top: '첫 향', middle: '메인향', base: '잔향', single: '싱글' }
    : { top: '탑', middle: '미들', base: '베이스', single: '향' };

  return (
    <div>
      <div className="flex flex-col space-y-5 mx-4">
        {data.single ? (
          <EachNote
            label={labels.single}
            ingredients={data.topNote.map(
              (ingredient: Ingredient) => ingredient[key],
            )}
          />
        ) : (
          <>
            <EachNote
              label={labels.top}
              ingredients={data.topNote.map(
                (ingredient: Ingredient) => ingredient[key],
              )}
            />
            <EachNote
              label={labels.middle}
              ingredients={data.middleNote.map(
                (ingredient: Ingredient) => ingredient[key],
              )}
            />
            <EachNote
              label={labels.base}
              ingredients={data.baseNote.map(
                (ingredient: Ingredient) => ingredient[key],
              )}
            />
          </>
        )}
      </div>
      <hr className="my-11 border-t-[1.5px] mx-4 border-acodegray-50" />
      <PerfumeStats id={id} />
    </div>
  );
};

export default PerfumeDetail;
