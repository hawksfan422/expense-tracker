import { Flex, VStack, Button } from "@chakra-ui/react";

import { MdDashboard, MdPayment, MdSettings, MdHelp, MdMoney } from "react-icons/md";

const ButtonStyle = {
    variant: 'ghost',
    color: 'black',
    justifyContent: 'flex-start'
}


const LeftBar = ({ setCurrentView, currentView }) => {
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
            <VStack align="stretch" spacing={6}>

                <Button leftIcon={<MdDashboard />} 
                {...ButtonStyle}
                onClick={() => setCurrentView('dashboard')}
                >
                    Dashboard
                </Button>

                <Button 
                leftIcon={<MdMoney />} 
                {...ButtonStyle}
                onClick={() => setCurrentView('expense')}
                >
                    Add Expense
                </Button>

                <Button leftIcon={<MdPayment />} 
                {...ButtonStyle}>
                    Bills & Payments
                </Button>

                <Button leftIcon={<MdSettings />} {...ButtonStyle}>
                    Settings
                </Button>

                <Button leftIcon={<MdHelp />} {...ButtonStyle}>
                    Get Help
                </Button>

            </VStack>
        </Flex>
    )
}
export default LeftBar;