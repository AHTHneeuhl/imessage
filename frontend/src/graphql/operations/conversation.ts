import { gql } from "@apollo/client";

const ConversationFields = gql`
  conversations {
    id
    participants {
      user {
        id
        username
      }
      hasSeenLastMessage
    }
    updatedAt
    latestMessage {
      id
      sender {
        id
        username
      }
      body
      createdAt
    }
  }
`;

const ConversationOperations = {
  Queries: {
    conversations: gql`
      query Conversations() {
        ${ConversationFields}
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};

export default ConversationOperations;
