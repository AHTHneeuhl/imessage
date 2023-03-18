import { SearchedUser } from "@/utils/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";

interface IUserSearchListProps {
  users: SearchedUser[];
}

const UserSearchList: React.FC<IUserSearchListProps> = ({ users }) => {
  return (
    <>
      {users.length ? (
        <Stack mt={6}>
          {users.map(({ id, username }) => (
            <Stack
              key={id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar />
              <Flex justify="space-between" align="center" width="100%">
                <Text color="whiteAlpha.700">{username}</Text>
                <Button bg="brand.100" _hover={{ bg: "brand.100" }}>
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
