import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for monthly disbursements
const monthlyDisbursementData = [
  { month: 'Jan', amount: 15200000, loans: 380 },
  { month: 'Feb', amount: 12800000, loans: 320 },
  { month: 'Mar', amount: 18900000, loans: 475 },
  { month: 'Apr', amount: 16500000, loans: 412 },
  { month: 'May', amount: 20100000, loans: 503 },
  { month: 'Jun', amount: 18520000, loans: 420 },
];

export function MonthlyDisbursementChart() {
  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyDisbursementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            className="text-xs" 
            stroke="#6b7280"
          />
          <YAxis 
            className="text-xs" 
            stroke="#6b7280"
            tickFormatter={formatCurrency}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            formatter={(value: number) => [formatCurrency(value), 'Disbursed Amount']}
            labelFormatter={(label) => `Month: ${label}`}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                    <p className="font-medium text-gray-900">{`${label} 2024`}</p>
                    <p className="text-blue-600">
                      <span className="font-medium">Amount:</span> {formatCurrency(data.amount)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Loans:</span> {data.loans}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="amount" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]}
            stroke="#2563eb"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}