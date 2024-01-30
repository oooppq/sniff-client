import Image from 'next/image';
import Link from 'next/link';

interface BuyProps {
  id: string;
  brandName: string;
  fragranceName: string;
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

const HereTobuy = async ({ id, brandName, fragranceName }: BuyProps) => {
  const data = await getPurchase(id);

  if (!data) return null;

  return data.purchaseList ? (
    <>
      <hr className="my-11 mx-4 mborder-t-[1.5px] border-[#f7f7f7]" />
      <div className="mx-4">
        <div className="h2 mb-[30px]">여기서 구매할 수 있어요</div>
        <div className="grid gap-y-3">
          {data.purchaseList.map(
            ({ link, image }: { link: string; image: string }) => (
              <Link key={`${link}-${image}`} href={link} target="_blank">
                <div className="flex items-center">
                  <Image
                    src={image}
                    alt="sinse"
                    width={80}
                    height={80}
                    objectFit="cover"
                    className="mr-[14px] w-20 h-20 rounded-sm"
                  />

                  <div className="flex flex-col justify-center body2 font-medium">
                    <div className="mb-[10px]">{fragranceName} 판매처</div>
                    <div className="h-[21px] mb-[2px] text-acodegray-500">
                      {brandName}
                    </div>
                    <div className="leading-[14px] tracking-[-0.35px] text-acodegray-700">
                      {fragranceName}
                    </div>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  ) : null;
};

export default HereTobuy;
