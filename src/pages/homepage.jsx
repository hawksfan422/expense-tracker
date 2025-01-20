import { Box, HStack, VStack } from "@chakra-ui/react";


const Homepage = () => {

    return (
      <VStack w={'120rem'} h={'100%'} justifyContent={'center'} alignItems={'center'} spaceY={'0'}>
        <Box w={'120rem'} h={'5rem'} bg={'red'} color={'white'}>
          TOPBAR
        </Box>

        <HStack w={'120rem'} h={'65rem'} bg={'blue'} justifyContent={'center'} alignItems={'center'} spaceX={'1rem'}>
          <Box
          w={'15%'}
          h={'100%'}
          bg={'green'}
          >hi</Box>

          <Box
          w={'40%'}
          bg={'purple'}
          >hi</Box>

          <Box
          w={'40%'}
          bg={'purple'}
          >hi</Box>
        </HStack>
      </VStack>
    )

}
export default Homepage;