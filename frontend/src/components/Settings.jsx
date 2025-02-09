import {
    Box,
    VStack,
    Text,
    Flex,
    Button,
    useColorMode,
    useColorModeValue
  } from "@chakra-ui/react";
  const Settings = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
      <Flex flex={1} direction="column">
        <Box 
        bg={useColorModeValue('white', 'blackAlpha.600')}
        color={useColorModeValue('black', 'white')}
        p={6} 
        borderRadius="lg" 
        shadow="sm">
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">Settings</Text>
  
            {/* Theme Setting */}
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium">Dark Mode</Text>
                <Text fontSize="sm" color={useColorModeValue('gray.500', 'whiteAlpha.800')}>Toggle dark/light theme</Text>
              </Box>
              <Button onClick={toggleColorMode}/>
            </Flex>

          </VStack>
        </Box>
      </Flex>
    );
  };
  
  export default Settings;

  //onClick={toggleColorMode}