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
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { register } from '../../services/auth.service';

import { FaRegUser, FaLock } from 'react-icons/fa';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const { login: authLogin } = useAuth(); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const userData = await register(username, password);
        authLogin(userData, userData.token); 
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
    <Box p={8} minWidth="500px" mx="auto" height={'100vh'} display={'flex'} flexDirection={'column'}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit} flex={1} justify="center">
        <Text fontSize="4xl" fontWeight="bold" color={'green.300'}>Register</Text>
        
        <FormControl isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaRegUser color='gray'/>} /><Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            focusBorderColor="green.300"
            placeholder='Username'
          />
        </InputGroup>
        </FormControl>
        <FormControl isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaLock color='gray'/>} />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            focusBorderColor="green.300"
            placeholder='Password'
          />
        </InputGroup>
        </FormControl>

        <Button type="submit" colorScheme="green" width="100%">
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;