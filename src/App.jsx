import { Flex } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom"

import Homepage from './pages/Homepage'

function App() {
  return (
    <Flex
    w={'100vw'}
    h={'100vh'}
    bg={'black'}
    >
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Flex>
  )
}

export default App
