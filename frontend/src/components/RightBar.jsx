import { Flex, VStack, Button, IconButton } from "@chakra-ui/react";


const RightBar = () => {
    return (
        <Flex
        w="400px" 
        direction="column" 
        bg="white" 
        p={6} 
        borderRadius="lg"
        shadow="sm"
        >
            Your Transaction History
        </Flex>
    )
}
export default RightBar;