import { Box, HStack, Flex, Text, Icon, Button, Input,useColorModeValue } from "@chakra-ui/react";
import { useState } from "react"; // Add this import

import LeftBar from "../components/LeftBar";
import DataDash from "../components/DataDash";
import HeaderStyle from "../components/Header";
import RightBar from "../components/RightBar";
import DeleteExpense from "../components/DeleteExpense.jsx";
import AddExpense from "../components/AddExpense.jsx";
import Settings from "../components/Settings.jsx";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch(currentView){
      case 'dashboard':
        return <DataDash/>;
      case 'add':
        return <AddExpense/>;
      case 'delete':
        return <DeleteExpense/>;
      case 'settings':
        return <Settings/>;
      default:
        return <DataDash/>;
    }
  }

  return (
    <Flex w="100%" h="100vh">
    
      {/* Main Content Area */}
      <Flex flex={1} bg={useColorModeValue('gray.50', 'blackAlpha.500')} p={8} direction="column" color={'black'}>

        {/* Header */}
        <HeaderStyle/>

        {/* Dashboard Content */}
        <Flex gap={6}>
          {/* Left Sidebar */}
          <LeftBar setCurrentView={setCurrentView} currentView={currentView}/>

          {/* Main Content Area */}
          {renderView()}

          {/* Right Sidebar */}
          <RightBar/>

        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;