import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../databasa/user';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1>{user.username}</h1>
      <p>id: {user.id}</p>
    </>
  );
}
