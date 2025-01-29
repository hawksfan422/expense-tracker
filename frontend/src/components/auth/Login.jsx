import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/auth.service';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Flex,
} from '@chakra-ui/react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const { login: authLogin } = useAuth(); 
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const userData = await login(username, password);
        authLogin(userData, userData.token);
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 2000,
        });
        navigate('/dashboard');
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 2000,
        });
      }
    };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Box p={8} minWidth="500px" mx="auto">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Text fontSize="2xl" fontWeight="bold">Login</Text>
        
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" width="100%">
          Login
        </Button>

        <Text>
          Don't have an account?{' '}
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Text>
      </VStack>
    </Box>
    <Box 
    position={'absolute'}  
    right={'10%'} 
    borderRadius="lg"
    shadow="sm" 
    p={8}
    bg={'gray.100'}
    justifyContent={'center'}
    alignItems={'center'}
    >
      <Text>For Demo Purposes</Text>
      <Text>Username: test</Text>
      <Text>Password: 123</Text>

    </Box>
    </Flex>
  );
};

export default Login;