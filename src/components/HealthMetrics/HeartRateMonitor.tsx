import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const HeartRateScatterPlot: React.FC = () => {
  const [heartRateData, setHeartRateData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    const generateData = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      const baseValue = 70;
      const randomVariation = Math.floor(Math.random() * 20) - 10;
      return {
        time: `${hour}:00`,
        value: baseValue + randomVariation,
      };
    });
    setHeartRateData(generateData);
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={heartRateData} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: 'Time of Day', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={[50, 100]}
            label={{ value: 'Heart Rate (BPM)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#ff6b6b" dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeartRateScatterPlot;
