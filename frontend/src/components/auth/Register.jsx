import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { register } from '../../services/auth.service';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const { login: authLogin } = useAuth(); // Add this line
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const userData = await register(email, password);
        authLogin(userData, userData.token); // Add this line
        toast({
          title: 'Registration successful',
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
    <Box p={8} maxWidth="500px" mx="auto">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Text fontSize="2xl" fontWeight="bold">Register</Text>
        
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Register
        </Button>

        <Text>
          Already have an account?{' '}
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register;