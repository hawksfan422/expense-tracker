import { Flex, Box, Text, HStack, Button, Icon, useColorModeValue} from "@chakra-ui/react";

import { GiBlackBar } from "react-icons/gi";


const HeaderStyle = () => {


    return(
        <Flex 
        w="100%" 
        bg={useColorModeValue('white', 'black')}
        p={6} 
        borderRadius="lg"
        shadow="sm"
        justify="space-between" 
        mb={12}
        >
        {/* Logo */}
        <Flex align="center">
          <Box bg="blue.400" p={2} borderRadius="md" mr={2}>
            <Icon as={GiBlackBar } mt={1} fontSize={'20px'} color={useColorModeValue('white', 'black')}/>
          </Box>
          <Text fontSize="xl" fontWeight="bold" ml={2} color={useColorModeValue('black', 'white')}>Expense Tracker</Text>
        </Flex>
        <HStack spacing={4}>
          <Button variant="ghost" color={useColorModeValue('black', 'white')}>Need Help?</Button>
          <Button variant="ghost" color={useColorModeValue('black', 'white')}>About</Button>
          <Button variant="ghost" color={useColorModeValue('black', 'white')}>Hello ...</Button>
        </HStack>
      </Flex>

    )
}

export default HeaderStyle;
