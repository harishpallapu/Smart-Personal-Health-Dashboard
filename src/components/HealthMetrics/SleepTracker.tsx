import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#6366F1', '#4F46E5', '#818CF8', '#A5B4FC', '#93C5FD', '#60A5FA', '#3B82F6'];

const SleepTracker: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate random sleep data
  const sleepData = days.map(day => ({
    name: day,
    hours: parseFloat((5 + Math.random() * 4).toFixed(1)), // Between 5 and 9 hours
  }));

  // Calculate total sleep hours for percentage calculation
  const totalHours = sleepData.reduce((acc, data) => acc + data.hours, 0);

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Sleep Tracker</CardTitle>
        <CardDescription>Monitor your sleep patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full mt-6 flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sleepData}
                dataKey="hours"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelStyle={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  fill: '#333',
                }}
              >
                {sleepData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} hours`, "Sleep Time"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
