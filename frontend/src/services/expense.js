const API_URL = '/api/expenses';

// Fetch all expenses
export const fetchExpenses = async () => {
  try {
    const token = localStorage.getItem('token'); // Get auth token
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};
// Add new expense
export const submitExpense = async (formData) => {
  try {
    const token = localStorage.getItem('token'); // Get auth token
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Add auth header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

// Delete expense
export const deleteExpense = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Get auth token
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Add auth header
      },
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