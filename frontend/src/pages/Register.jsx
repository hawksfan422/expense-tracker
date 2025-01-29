import Register from "../components/auth/Register";
import { Flex } from "@chakra-ui/react";

const RegisterPage = () => {
    return (
      <Flex minH="100vh" alignItems="center">
       <Register />
      </Flex>
    );
  };
  
  export default RegisterPage;