import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { withFilter } from "graphql-subscriptions";
import {
  GraphQLContext,
  MessagePopulated,
  SendMessageArguments,
  SendMessageSubscriptionPayload,
} from "../../utils/types";
import { userIsConversationParticipant } from "../../utils/helpers";
import { conversationPopulated } from "./conversation";

const resolvers = {
  Query: {
    messages: async (
      _: any,
      args: { conversationId: string },
      context: GraphQLContext
    ): Promise<Array<MessagePopulated>> => {
      const { session, prisma } = context;
      const { conversationId } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: userId },
      } = session;

      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: conversationPopulated,
      });

      if (!conversation) {
        throw new GraphQLError("Conversation Not Found");
      }

      const allowedToView = userIsConversationParticipant(
        conversation.participants,
        userId
      );

      if (!allowedToView) {
        throw new Error("Not Authorized");
      }

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
          include: messagePopulated,
          orderBy: {
            createdAt: "desc",
          },
        });

        return messages;
      } catch (error: any) {
        console.log("messages error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    sendMessage: async function (
      _: any,
      args: SendMessageArguments,
      context: GraphQLContext
    ): Promise<boolean> {
      const { session, prisma, pubsub } = context;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const { id: userId } = session.user;
      const { id: messageId, senderId, conversationId, body } = args;

      try {
        const newMessage = await prisma.message.create({
          data: {
            id: messageId,
            senderId,
            conversationId,
            body,
          },
          include: messagePopulated,
        });

        const participant = await prisma.conversationParticipant.findFirst({
          where: {
            userId,
            conversationId,
          },
        });

        if (!participant) {
          throw new GraphQLError("Participant does not exist");
        }

        const { id: participantId } = participant;

        const conversation = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: participantId,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
          },
          include: conversationPopulated,
        });

        pubsub.publish("MESSAGE_SENT", { messageSent: newMessage });
        pubsub.publish("CONVERSATION_UPDATED", {
          conversationUpdated: {
            conversation,
          },
        });

        return true;
      } catch (error) {
        console.log("sendMessage error", error);
        throw new GraphQLError("Error sending message");
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;

          return pubsub.asyncIterator(["MESSAGE_SENT"]);
        },
        (
          payload: SendMessageSubscriptionPayload,
          args: { conversationId: string },
          context: GraphQLContext
        ) => {
          return payload.messageSent.conversationId === args.conversationId;
        }
      ),
    },
  },
};

export const messagePopulated = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
    },
  },
});

export default resolvers;
