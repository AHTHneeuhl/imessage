import { ISODateString } from "next-auth";
import { Prisma, PrismaClient } from "@prisma/client";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
}

// Users

export interface Session {
  user?: User;
  expires: ISODateString;
}

export interface User {
  id: string;
  username?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

/**
 * Conversation
 */
export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;
