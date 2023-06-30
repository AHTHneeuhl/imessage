import { SearchedUser } from "@/utils/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface IUserSearchListProps {
  users: SearchedUser[];
  participants: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

const UserSearchList: React.FC<IUserSearchListProps> = ({
  users,
  participants,
  addParticipant,
}) => {
  return (
    <>
      {users.length ? (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.username}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar />
              <Flex justify="space-between" width="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  disabled={
                    !!participants.find(
                      (participant) => participant.id === user.id
                    )
                  }
                  onClick={() => addParticipant(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Flex mt={6} justify="center">
          <Text>No users found!</Text>
        </Flex>
      )}
    </>
  );
};

export default UserSearchList;
