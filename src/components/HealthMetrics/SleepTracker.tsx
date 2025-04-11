import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Updated color palette
const COLORS = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];

const SleepTracker: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate random sleep data
  const sleepData = days.map(day => ({
    name: day,
    hours: parseFloat((5 + Math.random() * 4).toFixed(1)), // Between 5 and 9 hours
  }));

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
                outerRadius={100}
                paddingAngle={2} // adds space between slices
                label={({ name, hours }) => `${name}: ${hours}h`}
                stroke="#fff"
                strokeWidth={2}
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
