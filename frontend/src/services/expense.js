const API_URL = '/api/expenses';

// Fetch all expenses
export const fetchExpenses = async () => {
  try {
    console.log('Fetching expenses...');
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched expenses:', data);
    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

// Add new expense
export const submitExpense = async (formData) => {
  try {
    console.log('Submitting expense:', formData);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

// Delete expense
export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};