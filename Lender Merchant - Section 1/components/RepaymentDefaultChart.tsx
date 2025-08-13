import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for repayment and default rates over time
const repaymentDefaultData = [
  { month: 'Jan', repaymentRate: 85.2, defaultRate: 6.8 },
  { month: 'Feb', repaymentRate: 87.1, defaultRate: 5.9 },
  { month: 'Mar', repaymentRate: 82.9, defaultRate: 8.1 },
  { month: 'Apr', repaymentRate: 89.3, defaultRate: 4.7 },
  { month: 'May', repaymentRate: 86.7, defaultRate: 6.3 },
  { month: 'Jun', repaymentRate: 84.2, defaultRate: 7.6 },
];

export function RepaymentDefaultChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={repaymentDefaultData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            className="text-xs" 
            stroke="#6b7280"
          />
          <YAxis 
            className="text-xs" 
            stroke="#6b7280"
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)}%`, 
              name === 'repaymentRate' ? 'Repayment Rate' : 'Default Rate'
            ]}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="repaymentRate" 
            stroke="#22c55e" 
            strokeWidth={3}
            name="Repayment Rate"
            dot={{ fill: '#22c55e', r: 4 }}
            activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: 'white' }}
          />
          <Line 
            type="monotone" 
            dataKey="defaultRate" 
            stroke="#ef4444" 
            strokeWidth={3}
            name="Default Rate"
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}