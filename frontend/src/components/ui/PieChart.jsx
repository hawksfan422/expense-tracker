import { Box, Text } from "@chakra-ui/react";
import { 
  PieChart as RechartsePieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const PieChartComponent = ({ data, colors }) => {
  return (
    <Box 
      h="400px" 
      bg="white" 
      borderRadius="lg" 
      p={6}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors(entry.name)} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Amount']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0'
            }}
          />
        </RechartsePieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartComponent;