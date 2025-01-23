import {
    Box,
    VStack,
    Text,
    Switch,
    Flex,
    Button,
    useToast,
    useColorMode,
    useColorModeValue
  } from "@chakra-ui/react";
  
  const Settings = () => {
    const toast = useToast();
  
    // Example settings
    const handleThemeChange = () => {
      toast({
        title: "Theme changed",
        status: "success",
        duration: 2000,
      });
    };

    return (
      <Flex flex={1} direction="column">
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <VStack spacing={6} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">Settings</Text>
  
            {/* Theme Setting */}
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium">Dark Mode</Text>
                <Text fontSize="sm" color="gray.500">Toggle dark/light theme</Text>
              </Box>
              <Switch onChange={handleThemeChange}/>
            </Flex>

          </VStack>
        </Box>
      </Flex>
    );
  };
  
  export default Settings;

  //onClick={toggleColorMode}