import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

import { MdCircle, MdMoney  } from "react-icons/md";

// icons for categories
import { CiShoppingTag, CiPizza } from "react-icons/ci";
import { PiGasPumpLight } from "react-icons/pi";


import { fetchExpenses } from "../services/expense";

const DataDash = () => {

  const [topCategories, setTopCategories] = useState([]);
  const [chartData, setChartData] = useState([]);

  const processExpenses = async () => {
    try {
      const expenses = await fetchExpenses();
      
      // Process categories for top boxes
      const categoryTotals = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
          acc[category] = {
            total: 0,
            count: 0
          };
        }
        acc[category].total += Number(amount);
        acc[category].count += 1;
        return acc;
      }, {});

      // Convert to array and sort by total amount
      const sortedCategories = Object.entries(categoryTotals)
        .map(([category, data]) => ({
          category,
          total: data.total,
          count: data.count
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3); // Get top 3

      setTopCategories(sortedCategories);

      // Process data for chart
      const chartData = Object.entries(categoryTotals).map(([category, data]) => ({
        category,
        amount: Number(data.total.toFixed(2)),
        transactions: data.count
      }));

      setChartData(chartData);

    } catch (error) {
      console.error('Error processing expenses:', error);
    }
  };

  useEffect(() => {
    processExpenses();
  }, []);

  // Custom colors for categories
  const getCategoryColor = (category) => {
    const colors = {
      Food: '#feebc8',
      Gas: '#fed7d7',
      Entertainment: '#9F7AEA',
      Bills: '#F56565',
      Shopping: '#bee3f8',
      Other: '#718096'
    };
    return colors[category] || '#718096';
  };

// Custom icons for categories
  const getCategoryIcon = (category) => {
    const icons = {
      Food: <CiPizza />,
      Shopping: <CiShoppingTag  />,
      Gas: <PiGasPumpLight />,

    };
    return icons[category] || <MdMoney />;
  };

  return (
    <Flex flex={1} direction="column">
      {/* Top Categories Stats */}
      <Flex gap={4} mb={6}>
        {topCategories.map((cat, index) => (
          <Box
            key={index}
            h={'125px'}
            p={4}
            bg="white"
            borderRadius="lg"
            flex={1}
            shadow="sm"
            display={'flex'}
            justifyContent={'space-between'}
            overflow={'hidden'}
          >
            <Box>
            <Text fontSize="sm" color="gray.500" display="flex" alignItems="center" gap={2}>
            <MdCircle color={`${getCategoryColor(cat.category)}`} />
            {cat.category}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              ${cat.total.toFixed(2)}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {cat.count} transaction{cat.count !== 1 ? 's' : ''}
            </Text>
            </Box>
            <Box 
            ml={'100'} 
            w={'100px'} 
            h={'100px'} 
            fontSize={'125px'} 
            display={'flex'} 
            justifyContent={'center'} 
            alignItems={'center'}
            >
            <Box 
            marginTop={9}
            marginLeft={14}
            color={`${getCategoryColor(cat.category)}`}
            >
              {getCategoryIcon(cat.category)}
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>

      {/* Chart Area */}
      <Box 
        h="400px" 
        bg="white" 
        borderRadius="lg" 
        shadow="sm" 
        p={6}
        minHeight={'50vh'}
      >
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Expense Distribution
        </Text>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0'
              }}
            />
            <Legend />
            <Bar 
              dataKey="amount" 
              name="Amount ($)" 
              fill="#4299E1"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
};

export default DataDash;