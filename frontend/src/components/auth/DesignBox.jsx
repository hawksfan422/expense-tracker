import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const DesignBox = ({ link, topText, description, buttonText, bgcolors }) => {
    const navigate = useNavigate();
    return (
        <Box bgGradient={bgcolors} 
        minW={'40%'} minH={'100vh'} 
        display={"flex"} justifyContent={"center"} alignItems={"center"} 
        color={'white'} flexDirection={'column'}>
            <VStack spacing={6} textAlign="center">
                <Text fontSize="4xl" fontWeight="bold" w={'100%'}>{topText}</Text>
                <Text fontSize="xl" w={'100%'}>{description}</Text>

                <Button
                variant={'outline'}
                colorScheme={'white'}
                onClick={() => navigate(`/${link}`)}
                w={'95%'}
                mt={4}
                >
                    {buttonText}
                </Button>
            </VStack>
        </Box>
    );
}

export default DesignBox;