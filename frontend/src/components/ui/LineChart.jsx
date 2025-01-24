import { Box, Text } from "@chakra-ui/react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const LineChartComponent = ({ data, categories, colors }) => {
  return (
    <Box 
      h="400px" 
      bg="white" 
      borderRadius="lg" 
      p={6}
      mb={6}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Amount']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0'
            }}
          />
          <Legend />
          {categories.map((cat) => (
            <Line
              key={cat.category}
              type="monotone"
              dataKey={cat.category}
              stroke={colors(cat.category)}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartComponent;