import {
  ConversationPopulated,
  MessagePopulated,
} from "../../../backend/src/utils/types";

/**
 * User
 */
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: SearchedUser[];
}

export interface SearchedUser {
  id: string;
  username: string;
}

/**
 * Conversation
 */

export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: string[];
}

export interface ConversationCreatedSubscriptionData {
  subscriptionData: {
    data: {
      conversationCreated: ConversationPopulated;
    };
  };
}

export interface ConversationUpdatedData {
  conversationUpdated: {
    conversation: Omit<ConversationPopulated, "latestMessage"> & {
      latestMessage: MessagePopulated;
    };
    addedUserIds: Array<string> | null;
    removedUserIds: Array<string> | null;
  };
}

export interface ConversationDeletedData {
  conversationDeleted: {
    id: string;
  };
}

/**
 * Messages
 */
export interface MessagesData {
  messages: Array<MessagePopulated>;
}

export interface MessagesVariables {
  conversationId: string;
}

export interface SendMessageVariables {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessagesSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}
