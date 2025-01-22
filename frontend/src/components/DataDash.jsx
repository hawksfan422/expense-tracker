import { Flex, Box, Text } from "@chakra-ui/react";


const DataDash = () => {
    return(
    <Flex flex={1} direction="column" >
      {/* Stats Row */}
      <Flex gap={4} mb={6}>
         {['$10.00', '$20.00', '$30.00', ].map((value, i) => (
          <Box 
          h={'125px'}
          key={i} 
          p={4} 
          bg="white" 
          borderRadius="lg" 
          flex={1}  
          shadow="sm">

            <Text fontSize="2xl" fontWeight="bold">{value}</Text>
          </Box>
        ))}
      </Flex>
      {/* Chart Area */}
      <Box h="400px" bg="white" borderRadius="lg" shadow="sm">
        {/* Add data later */}
      </Box>
    </Flex>
    )
}

export default DataDash;
