import { Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom"

import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Flex color>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Flex>
  )
}

export default App
