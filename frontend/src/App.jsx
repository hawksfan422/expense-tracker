import { Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom"
import { ExpenseProvider } from "./context/ExpenseContext";

import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Flex>
      <ExpenseProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </ExpenseProvider>
    </Flex>
  )
}

export default App
