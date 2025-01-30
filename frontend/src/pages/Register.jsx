import DesignBox from "../components/auth/DesignBox";
import Register from "../components/auth/Register";
import { Flex } from "@chakra-ui/react";

const RegisterPage = () => {
    return (
      <Flex minH="100vh" alignItems="center">
        <DesignBox
          link='login' 
          topText = "Already have an account?"
          description = "Login now and start budgeting in a fun way!"
          buttonText = "Login"
          bgcolors={'linear(to-t, green.700, green.300)'}
          />
        <Register />
      </Flex>
    );
  };
  
  export default RegisterPage;