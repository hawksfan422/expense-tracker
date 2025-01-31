import { useExpenses } from "../context/ExpenseContext";

import { 
    Box, 
    Button,  
    useToast,
    Flex,
    Table,
    Th,
    Tr,
    Tbody,
    Td,
    Thead,
    useColorModeValue
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { fetchExpenses, deleteExpense } from "../services/expense";
import { use } from "react";
  
  const DeleteExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const toast = useToast();

    const expenseContext = useExpenses();
    const refreshExpenses = expenseContext?.refreshExpenses || (() => {}); 
  
    // Fetch expenses handler
    const handleFetchExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        toast({
          title: "Error fetching expenses",
          description: error.message,
          status: "error",
          duration: 3000,
        });
      }
    };

    // Handle delete
    const handleDelete = async (id) => {
      try {
        await deleteExpense(id);
        toast({
          title: "Expense deleted.",
          status: "success",
          duration: 2000,
        });
        refreshExpenses();
        handleFetchExpenses();
      } catch (error) {
        toast({
          title: "Error deleting expense.",
          status: "error",
          duration: 2000,
        });
      }
    };
  
    useEffect(() => {
      handleFetchExpenses();
    }, [refreshExpenses]);
  
    return (
      <Flex flex={1} direction="column" color={useColorModeValue('black', 'white')}>
          {/* Expenses Table */}
          <Box bg={useColorModeValue('white', 'blackAlpha.600' )} p={6} borderRadius="lg" shadow="sm" overflowX="auto" minH={0}>
            <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <Thead>
                <Tr>
                  <Th style={{ textAlign: 'left', padding: '12px' }}>Name</Th>
                  <Th style={{ textAlign: 'left', padding: '12px' }}>Category</Th>
                  <Th style={{ textAlign: 'left', padding: '12px' }}>Amount</Th>
                  <Th style={{ textAlign: 'left', padding: '12px' }}>Description</Th>
                  <Th style={{ textAlign: 'left', padding: '12px' }}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenses.map((expense) => (
                  <Tr key={expense._id}>
                    <Td style={{ padding: '12px' }} maxW={'300px'}>{expense.name}</Td>
                    <Td style={{ padding: '12px' }}>{expense.category}</Td>
                    <Td style={{ padding: '12px' }}>${expense.amount}</Td>
                    <Td style={{ padding: '12px' }} maxW={'300px'}>{expense.description}</Td>
                    <Td style={{ padding: '12px' }}>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(expense._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
      </Flex>
    );
  };
  
  export default DeleteExpense;