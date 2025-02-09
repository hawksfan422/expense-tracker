import { Flex, Box, Text, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";

import { MdCircle, MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

// icons for categories
import { CiShoppingTag, CiPizza, CiMoneyCheck1, CiHospital1  } from "react-icons/ci";
import { PiGasPumpLight, PiPopcornThin, PiTrainLight  } from "react-icons/pi";
import { MdMoney } from "react-icons/md";

// Data
import LineChartComponent from './ui/LineChart';
import PieChartComponent from './ui/PieChart';


import { fetchExpenses } from '../services/expense';

const DataDash = () => {
  const [topCategories, setTopCategories] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [currentChart, setCurrentChart] = useState('line'); // Add this state
  const [pieChartData, setPieChartData] = useState([]);
  const expenseContext = useExpenses();
  const shouldRefresh = expenseContext?.shouldRefresh;

  const toggleChart = () => {
    setCurrentChart(currentChart === 'line' ? 'pie' : 'line');
  };

  // Custom colors for categories
  const getCategoryColor = (category) => {
    const colors = {
      Food: '#feebc8',
      Gas: '#fed7d7',
      Entertainment: '#e9d8fd',
      Bills: '#c6f6d5',
      Shopping: '#bee3f8',
      Transportation: '#b2f5ea',
      Healthcare: '#fed7e2',
      Other: '#718096'
    };
    return colors[category] || '#718096';
  };

  // Custom icons for categories
  const getCategoryIcon = (category) => {
    const icons = {
      Food: <CiPizza />,
      Gas: <PiGasPumpLight />,
      Entertainment: <PiPopcornThin />,
      Bills: <CiMoneyCheck1 />,
      Shopping: <CiShoppingTag />,
      Transportation: <PiTrainLight />,
      Healthcare: <CiHospital1 />,
    };
    return icons[category] || <MdMoney />;
  };

  const processExpenses = async () => {
    try {
      const expenses = await fetchExpenses();
      
      // Process categories for top boxes and charts
      const categoryTotals = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
          acc[category] = {
            total: 0,
            count: 0,
            transactions: []
          };
        }
        acc[category].total += Number(amount);
        acc[category].count += 1;
        acc[category].transactions.push({
          amount: Number(amount),
          date: new Date(expense.createdAt)
        });
        return acc;
      }, {});

      // Get top 3 categories
      const sortedCategories = Object.entries(categoryTotals)
        .map(([category, data]) => ({
          category,
          total: data.total,
          count: data.count
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

      setTopCategories(sortedCategories);

      // Process data for pie chart
      const pieData = Object.entries(categoryTotals).map(([category, data]) => ({
        name: category,
        value: Number(data.total.toFixed(2))
      }));
      setPieChartData(pieData);

      // Process data for line chart
      const allDates = [...new Set(expenses.map(exp => 
        new Date(exp.createdAt).toLocaleDateString()
      ))].sort((a, b) => new Date(a) - new Date(b));

      const lineData = allDates.map(date => {
        const dataPoint = { date };
        sortedCategories.forEach(({ category }) => {
          const categoryData = categoryTotals[category].transactions
            .filter(t => t.date.toLocaleDateString() === date)
            .reduce((sum, t) => sum + t.amount, 0);
          dataPoint[category] = categoryData;
        });
        return dataPoint;
      });

      setLineChartData(lineData);

    } catch (error) {
      console.error('Error processing expenses:', error);
    }
  };

  useEffect(() => {
    processExpenses();
  }, [shouldRefresh]);

  return (
    <Flex flex={1} direction="column">
      {/* Top Categories Stats */}
      <Flex  gap={4} mb={6}>
        {topCategories.map((cat, index) => (
          <Box
            key={index}
            h={'125px'}
            p={4}
            bg={useColorModeValue('white', 'blackAlpha.600')}
            color={useColorModeValue('black', 'white')}
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
       {/* Combined Chart Box */}
      <Box 
        bg={useColorModeValue('white', 'blackAlpha.600' )}
        color={useColorModeValue('black', 'white')}
        borderRadius="lg" 
        shadow="sm"
      >
        {/* Chart Header */}
        <Flex 
          justify="space-between" 
          align="center" 
          p={4} 
        >
          <Text fontSize="lg" fontWeight="bold">
            {currentChart === 'line' ? 'Expense Trends' : 'Expense Distribution'}
          </Text>
          <IconButton
            icon={currentChart === 'line' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
            onClick={toggleChart}
            aria-label="Toggle chart"
            variant="ghost"
            size="lg"
            _hover={{ bg: 'gray.100' }}
          />
        </Flex>

        {/* Chart Content */}
        <Box
          position="relative"
          transition="opacity 0.3s ease-in-out"
          p={6}
        >
          {currentChart === 'line' ? (
            <LineChartComponent 
              data={lineChartData}
              categories={topCategories}
              colors={getCategoryColor}
            />
          ) : (
            <PieChartComponent 
              data={pieChartData}
              colors={getCategoryColor}
            />
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default DataDash;