import { SearchedUser } from "@/utils/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface IParticipantsProps {
  participants: SearchedUser[];
  removeParticipant: (userId: string) => void;
}

const Participants: React.FC<IParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  return (
    <Flex mt={8} gap={2} flexWrap="wrap">
      {participants.map(({ id, username }) => (
        <Stack
          key={id}
          direction="row"
          align="center"
          bg="whiteAlpha.200"
          borderRadius={4}
          p={2}
        >
          <Text>{username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor="pointer"
            onClick={() => removeParticipant(id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
