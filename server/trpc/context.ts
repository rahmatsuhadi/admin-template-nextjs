
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/server/db'; // <-- Impor instance Prisma

export async function createContext() {
  const session = await getServerSession(authOptions);
  return {
    session,
    db, 
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;