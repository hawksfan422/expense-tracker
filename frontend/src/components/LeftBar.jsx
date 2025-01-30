import { Flex, VStack, Button, useColorModeValue } from "@chakra-ui/react";

import { MdDashboard, MdDelete , MdSettings, MdHelp, MdMoney } from "react-icons/md";


const LeftBar = ({ setCurrentView, currentView }) => {
    
    const ButtonStyle = {
        variant: 'ghost',
        color: useColorModeValue('black', 'white'),
        justifyContent: 'flex-start'
    }

    return (
        <Flex
        w="300px"
        minH={'75vh'} 
        direction="column" 
        bg={useColorModeValue('white', 'black' )}
        p={6} 
        borderRadius="lg"
        shadow="sm"
        >
        {/* Navigation Items */}
            <VStack align="stretch" spacing={6}>

                <Button 
                leftIcon={<MdDashboard />} 
                {...ButtonStyle}
                onClick={() => setCurrentView('dashboard')}
                >
                    Dashboard
                </Button>

                <Button 
                leftIcon={<MdMoney />} 
                {...ButtonStyle}
                onClick={() => setCurrentView('add')}
                >
                    Add Transaction
                </Button>

                <Button leftIcon={<MdDelete />} 
                {...ButtonStyle}
                onClick={() => setCurrentView('delete')}
                >
                    Delete Transaction
                </Button>

                <Button 
                leftIcon={<MdSettings />} 
                {...ButtonStyle}
                onClick={() => setCurrentView('settings')}
                >
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