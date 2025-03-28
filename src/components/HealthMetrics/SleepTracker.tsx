import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sunrise, Sunset } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SleepTracker: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const [sleepData] = useState(() => {
    return days.map(day => {
      const hours = 5 + Math.random() * 4; // Between 5 and 9 hours
      return {
        day,
        hours: parseFloat(hours.toFixed(1))
      };
    });
  });
  
  const totalHours = sleepData.reduce((acc, data) => acc + data.hours, 0);
  
  const pieData = sleepData.map(data => ({
    name: data.day,
    value: data.hours
  }));
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
  
  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Sleep Tracker</CardTitle>
            <CardDescription>Monitor your sleep patterns</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 text-center"
          >
            <div className="opacity-60 mb-1">
              <Sunset className="h-5 w-5 mx-auto" />
            </div>
            <p className="text-xs text-slate-500 mb-1">Total Sleep</p>
            <p className="text-2xl font-semibold text-indigo-600">{totalHours}h</p>
          </motion.div>
        </div>
        
        <div className="h-[250px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
