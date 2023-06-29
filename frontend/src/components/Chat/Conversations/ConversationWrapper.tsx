import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";

interface IConversationWrapperProps {
  session: Session;
}

const ConversationWrapper: React.FC<IConversationWrapperProps> = ({
  session,
}) => {
  return (
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      {/* Skeleton Loader  */}
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationWrapper;
