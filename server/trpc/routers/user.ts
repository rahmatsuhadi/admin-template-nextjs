
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';

export const userRouter = router({
  create: publicProcedure
    .input(z.object({
      email: z.email(),
      password: z.string().min(6),
      name: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists.',
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 10);
      
      // Buat user baru
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          hashedPassword,
          name: input.name,
        },
      });
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }),
});