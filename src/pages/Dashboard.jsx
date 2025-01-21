import { Box, HStack, Flex, Text, Icon, Button, Input } from "@chakra-ui/react";


import LeftBar from "../components/LeftBar";
import DataDash from "../components/DataDash";
import HeaderStyle from "../components/Header";
import RightBar from "../components/RightBar";

const Dashboard = () => {
  return (
    <Flex w="100%" h="100vh">
    
      {/* Main Content Area */}
      <Flex flex={1} bg="gray.50" p={8} direction="column" color={'black'}>

        {/* Header */}
        <HeaderStyle/>

        {/* Dashboard Content */}
        <Flex gap={6}>
          {/* Left Sidebar */}
          <LeftBar/>

          {/* Main Content Area */}
          <DataDash/>

          {/* Right Sidebar */}
          <RightBar/>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;