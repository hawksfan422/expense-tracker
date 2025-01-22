import { 
    Box, 
    Button, 
    Input, 
    VStack, 
    useToast,
    Text,
    Flex
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  
  const ExpenseManager = () => {
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({
      name: "",
      category: "",
      amount: "",
      description: ""
    });
    const toast = useToast();
  
  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast({
          title: "Expense added.",
          status: "success",
          duration: 2000,
        });
        setFormData({ name: "", category: "", amount: "", description: "" });
        fetchExpenses();
      }
    } catch (error) {
      toast({
        title: "Error adding expense.",
        status: "error",
        duration: 2000,
      });
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast({
          title: "Expense deleted.",
          status: "success",
          duration: 2000,
        });
        fetchExpenses();
      }
    } catch (error) {
      toast({
        title: "Error deleting expense.",
        status: "error",
        duration: 2000,
      });
    }
  };
  
    return (
      <Flex flex={1} direction="column">
        <VStack spacing={6} align="stretch">
          {/* Add Expense Form */}
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
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
                  <Input 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                    placeholder="Enter category"
                  />
                </Box>
                
                <Box w="100%">
                  <Text mb={2}>Amount</Text>
                  <Input 
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                    placeholder="Enter amount"
                  />
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
  
          {/* Expenses Table */}
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" overflowX="auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Description</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td style={{ padding: '12px' }}>{expense.name}</td>
                    <td style={{ padding: '12px' }}>{expense.category}</td>
                    <td style={{ padding: '12px' }}>${expense.amount}</td>
                    <td style={{ padding: '12px' }}>{expense.description}</td>
                    <td style={{ padding: '12px' }}>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(expense._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </VStack>
      </Flex>
    );
  };
  
  export default ExpenseManager;