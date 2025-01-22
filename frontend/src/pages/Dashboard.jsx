import { Box, HStack, Flex, Text, Icon, Button, Input } from "@chakra-ui/react";
import { useState } from "react"; // Add this import

import LeftBar from "../components/LeftBar";
import DataDash from "../components/DataDash";
import HeaderStyle from "../components/Header";
import RightBar from "../components/RightBar";
import ExpenseManager from "../components/ExpenseManager";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <Flex w="100%" h="100vh">
    
      {/* Main Content Area */}
      <Flex flex={1} bg="gray.50" p={8} direction="column" color={'black'}>

        {/* Header */}
        <HeaderStyle/>

        {/* Dashboard Content */}
        <Flex gap={6}>
          {/* Left Sidebar */}
          <LeftBar setCurrentView={setCurrentView} currentView={currentView}/>

          {/* Main Content Area */}
          {currentView === 'dashboard' ? <DataDash/> : <ExpenseManager/>}

          {/* Right Sidebar */}
          <RightBar/>

        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;