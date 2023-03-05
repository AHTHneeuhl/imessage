import { userOperations } from "@/graphql/operations";
import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { data, loading, error }] = useMutation(
    userOperations.Mutations.createUsername
  );

  const onSubmit = async () => {
    try {
      await createUsername({ variables: { username } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={4}>
        {session ? (
          <>
            <Text fontSize="2xl">Create a Username</Text>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={onSubmit} type="submit" w="100%">
              Submit
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessangerQL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image
                  src="/images/google-icon.png"
                  alt="google-icon"
                  height={4}
                />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
