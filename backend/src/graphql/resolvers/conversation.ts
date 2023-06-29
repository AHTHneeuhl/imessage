import { GraphQLContext } from "../../utils/types";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      ctx: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      const { session, prisma } = ctx;
      const { participantIds } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
          },
          include: conversationPopulated,
        });

        return {
          conversationId: conversation.id,
        };
      } catch (error: any) {
        console.log("Create conversation errog", error);
        throw new GraphQLError("Error", error.message);
      }
    },
  },
};

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });

export default resolvers;
