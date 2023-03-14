import { PrismaService } from "prisma/services/prisma.service";

export interface JwtPayload {
  id: number;
  email: string;
  //role: []
}