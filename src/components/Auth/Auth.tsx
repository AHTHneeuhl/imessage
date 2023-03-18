import { userOperations } from "@/graphql/operations";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { loading }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;

    try {
      const { data } = await createUsername({ variables: { username } });
      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }

      toast.success("Username successfully created!");

      reloadSession();
    } catch (error: any) {
      toast.error(error.message);
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
            <Button
              onClick={onSubmit}
              type="submit"
              w="100%"
              isLoading={loading}
            >
              Save
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
