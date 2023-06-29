import ConversationOperations from "@/graphql/operations/conversation";
import UserOperations from "@/graphql/operations/user";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchUsersData,
  SearchUsersInput,
  SearchedUser,
} from "@/utils/types";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";

interface IModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const {
    user: { id: userId },
  } = session;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<SearchedUser[]>([]);
  const [searchUsers, { data, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  const onCreateConversation = async () => {
    const participantIds = [userId!, ...participants.map((p) => p.id)];
    try {
      const { data } = await createConversation({
        variables: { participantIds },
      });

      if (!data?.createConversation) {
        throw new Error("Fail to create conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });

      setParticipants([]);
      setUsername("");
      onClose();
    } catch (error: any) {
      console.log("onCreateConversation Error", error);
      toast.error(error?.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#2d2d2d" pb={4}>
        <ModalHeader>Create Conversation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSearch}>
            <Stack spacing={4}>
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button type="submit" disabled={!username} isLoading={loading}>
                Search
              </Button>
            </Stack>
          </form>
          {data?.searchUsers ? (
            <UserSearchList
              users={data.searchUsers}
              addParticipant={addParticipant}
            />
          ) : null}
          {participants.length ? (
            <>
              <Participants
                participants={participants}
                removeParticipant={removeParticipant}
              />
              <Button
                bg="brand.100"
                width="100%"
                mt="6"
                _hover={{ bg: "brand.100" }}
                isLoading={createConversationLoading}
                onClick={() => {}}
              >
                Create Conversation
              </Button>
            </>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConversationModal;
