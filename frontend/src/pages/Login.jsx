import DesignBox from "../components/auth/DesignBox";
import Login from "../components/auth/Login";
import { Box, Flex, HStack } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Flex minH="100vh" alignItems="center">
      <HStack w={'100%'}>
        <DesignBox 
        link='register'
        topText = "Don't have an account?"
        description = "Create an account and start budgeting in a fun way!"
        buttonText = "Register"
        bgcolors={'linear(to-t, green.300, green.700)'}
        />
        <Login />
      </HStack>
    </Flex>
  );
};

export default LoginPage;