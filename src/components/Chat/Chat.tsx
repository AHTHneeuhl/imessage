import { Box, Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

interface IChatProps {}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <Box>
      Chat <Button onClick={() => signOut()}>Logout</Button>
    </Box>
  );
};

export default Chat;
