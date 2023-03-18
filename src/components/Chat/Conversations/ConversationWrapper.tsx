import { Session } from "next-auth";

interface IConversationWrapperProps {
  session: Session;
}

const ConversationWrapper: React.FC<IConversationWrapperProps> = ({
  session,
}) => {
  return <div>Conversation Wrapper</div>;
};

export default ConversationWrapper;
