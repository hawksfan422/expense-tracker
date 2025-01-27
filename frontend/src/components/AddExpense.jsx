import { useExpenses } from "../context/ExpenseContext";

import { 
  Box, 
  Button, 
  Input, 
  VStack, 
  useToast,
  Text,
  Flex,
  InputLeftElement,
  InputGroup
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CustomSelect from './ui/Select';
import { EXPENSE_CATEGORIES } from '../constants/ExpenseCategories'
import { fetchExpenses, submitExpense } from "../services/expense";

const AddExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
    description: ""
  });
  const toast = useToast();

  const expensesContext = useExpenses();
  const refreshExpenses = expensesContext?.refreshExpenses || (() => {}); 

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

   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitExpense(formData);
      toast({
        title: "Expense added successfully",
        status: "success",
        duration: 2000,
      });
      setFormData({ name: "", category: "", amount: "", description: "" });
      refreshExpenses(); // Refresh the list
    } catch (error) {
      toast({
        title: "Error adding expense",
        description: error.message,
        status: "error",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    handleFetchExpenses();
  }, []);

  return (
    <Flex flex={1} direction="column">
      <VStack spacing={6} align="stretch">
        {/* Add Expense Form */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm" w={'1100px'}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2}>Name</Text>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Enter expense name"
                />
              </Box>
              
              <Box w="100%">
                <Text mb={2}>Category</Text>
                <CustomSelect
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  options={EXPENSE_CATEGORIES}
                  placeholder="Select category"
                  required
                />
              </Box>
              
              <Box w="100%">
                <Text mb={2}>Amount</Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.500'
                    fontSize='em'
                    children='$'
                  />
                  <Input
                    pl="1.75rem"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                    placeholder="Enter amount"
                    step="0.01"
                    min="0"
                  />
                </InputGroup>
              </Box>
              
              <Box w="100%">
                <Text mb={2}>Description</Text>
                <Input 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter description (optional)"
                />
              </Box>
              
              <Button type="submit" colorScheme="blue" w="100%">
                Add Expense
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Flex>
  );
};

export default AddExpense;