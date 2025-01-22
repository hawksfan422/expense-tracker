import { Flex, Box, Text, HStack, Button, Icon} from "@chakra-ui/react";

import { PiCatBold } from "react-icons/pi";


const HeaderStyle = () => {
    return(
        <Flex 
        w="100%" 
        bg="white" 
        p={6} 
        borderRadius="lg"
        shadow="sm"
        justify="space-between" 
        mb={12}>
        {/* Logo */}
        <Flex align="center">
          <Box bg="blue.400" p={2} borderRadius="md" mr={2}>
            <Icon as={PiCatBold } color="white" boxSize={5} />
          </Box>
          <Text fontSize="xl" fontWeight="bold">Expense Tracker</Text>
        </Flex>
        <HStack spacing={4}>
        
          <Button variant="ghost" color={'black'}>Need Help?</Button>
          <Button variant="ghost" color={'black'}>About This</Button>
          <Button variant="ghost" color={'black'}>Hello ...</Button>
        </HStack>
      </Flex>

    )
}

export default HeaderStyle;
