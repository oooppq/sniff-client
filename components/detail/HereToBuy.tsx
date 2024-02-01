import Image from 'next/image';
import Link from 'next/link';

interface BuyProps {
  id: string;
}

export async function getPurchase(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/fragrance/${id}/purchase`,
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}

const HereTobuy = async ({ id }: BuyProps) => {
  const data = await getPurchase(id);

  if (!data) return null;

  return (
    <>
      <hr className="my-11 mx-4 mborder-t-[1.5px] border-[#f7f7f7]" />
      <div className="mx-4">
        <div className="h2 mb-[30px]">여기서 구매할 수 있어요</div>
        <div className="grid gap-y-3 mb-[100px]">
          {data.purchaseList?.map(
            ({
              title,
              link,
              image,
            }: {
              title: string;
              link: string;
              image: string;
            }) => (
              <Link key={`${link}-${image}`} href={link} target="_blank">
                <div className="flex items-center">
                  <Image
                    src={image}
                    alt="vendor"
                    width={80}
                    height={80}
                    objectFit="cover"
                    className="mr-[14px] w-20 h-20 rounded-sm"
                  />

                  <div className="flex flex-col justify-center body2 font-medium">
                    <div className="mb-[10px]">{title}</div>
                    <div className="h-[21px] mb-[2px] text-acodegray-500">
                      {data.brandName}
                    </div>
                    <div className="leading-[14px] tracking-[-0.35px] text-acodegray-700">
                      {data.fragranceName}
                    </div>
                  </div>
                </div>
              </Link>
            ),
          ) || (
            <div className="body2 h-20 w-full bg-acodegray-50 inline-flex items-center justify-center text-acodegray-300 rounded">
              구매처를 찾는 중이에요
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HereTobuy;
