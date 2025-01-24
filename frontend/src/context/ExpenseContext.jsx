import { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    const refreshExpenses = () => {
        setShouldRefresh(prev => !prev);
    };

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses, refreshExpenses, shouldRefresh }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenses = () => useContext(ExpenseContext);