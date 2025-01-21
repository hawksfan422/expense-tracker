import { Flex, VStack, Button, IconButton } from "@chakra-ui/react";

import { MdDashboard, MdPayment, MdSettings, MdHelp } from "react-icons/md";

const IconButtonStyle = {
    variant: 'ghost',
    color: 'black',
    justifyContent: 'flex-start'
}


const LeftBar = () => {
    return (
        <Flex
        w="300px" 
        direction="column" 
        bg="white" 
        p={6} 
        borderRadius="lg"
        shadow="sm"
        >
        {/* Navigation Items */}
            <VStack align="stretch" spacing={4}>
                <IconButton {...IconButtonStyle}>
                    <MdDashboard />
                    Dashboard
                </IconButton>
                <IconButton {...IconButtonStyle}>
                    <MdPayment />
                    Bills & Payments
                </IconButton>
                <IconButton {...IconButtonStyle}>
                    <MdSettings />
                    Settings
                </IconButton>
                <IconButton {...IconButtonStyle}>
                    <MdHelp />
                    Get Help
                </IconButton>
            </VStack>
        </Flex>
    )
}
export default LeftBar;