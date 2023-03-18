import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationModal from "./Modal/Modal";

interface IConversationListProps {
  session: Session;
}

const ConversationList: React.FC<IConversationListProps> = ({ session }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.400"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ConversationList;
