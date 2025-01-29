import Login from "../components/auth/Login";
import { Flex } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Flex minH="100vh" alignItems="center">
      <Login />
    </Flex>
  );
};

export default LoginPage;