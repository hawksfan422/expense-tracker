import { useExpenses } from "../context/ExpenseContext";

import { 
    Flex, 
    VStack, 
    Text, 
    Box,
    Divider,
    Badge
} from "@chakra-ui/react";


import { fetchExpenses } from "../services/expense";
import { useEffect, useState } from "react";

const RightBar = () => {
    const [recentTransactions, setRecentTransactions] = useState([]);
    const { shouldRefresh } = useExpenses();

    const getRecentTransactions = async () => {
        try {
            const expenses = await fetchExpenses();
            // Sort by date and get the 5 most recent transactions
            const recent = expenses
                // use created at to get the latest
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 10);
            setRecentTransactions(recent);
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
        }
    };

    useEffect(() => {
        getRecentTransactions();
    }, [shouldRefresh]);

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    // Function to get badge color based on category
    const getCategoryColor = (category) => {
        const colors = {
            Food: 'orange',
            Gas: 'red',
            Bills: 'green',
            Shopping: 'blue',
            Other: 'gray'
        };
        return colors[category] || 'gray';
    };

    return (
        <Flex
            w="400px" 
            direction="column" 
            bg="white" 
            p={6} 
            borderRadius="lg"
            shadow="sm"
        >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Recent Transactions
            </Text>
            
            <VStack spacing={4} align="stretch">
                {recentTransactions.length === 0 ? (
                    <Text color="gray.500" textAlign="center">
                        No recent transactions
                    </Text>
                ) : (
                    recentTransactions.map((transaction) => (
                        <Box key={transaction._id}>
                            <Flex justify="space-between" align="center">
                                <Box>
                                    <Text fontWeight="medium">
                                        {transaction.name}
                                    </Text>
                                    <Flex gap={2} align="center">
                                        <Badge 
                                            colorScheme={getCategoryColor(transaction.category)}
                                            borderRadius="full"
                                            px={2}
                                        >
                                            {transaction.category}
                                        </Badge>
                                        <Text fontSize="sm" color="gray.500">
                                            {formatDate(transaction.createdAt)}
                                        </Text>
                                    </Flex>
                                </Box>
                                <Text 
                                    fontWeight="bold" 
                                    color="red.500"
                                >
                                    ${Number(transaction.amount).toFixed(2)}
                                </Text>
                            </Flex>
                            <Divider mt={2} />
                        </Box>
                    ))
                )}
            </VStack>
        </Flex>
    );
};

export default RightBar;