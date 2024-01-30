import { FAILED, NOT_AUTHORIZED } from '@/constants/statusCodes';
import { getSession } from '@/utils/auth';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const userInfo = getSession();

  if (!userInfo) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { id } = params;
  const body = await req.json();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/review/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        AUTHORIZATION: `Bearer ${userInfo.jwt}`,
      },
      method: 'POST',
      body: JSON.stringify(body.payload),
    },
  );

  if (res.ok) {
    return new Response(JSON.stringify({ payload: body.payload }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  if (res.status === 401) return new Response(NOT_AUTHORIZED, { status: 401 });
  return new Response(FAILED, { status: 400 });
}
