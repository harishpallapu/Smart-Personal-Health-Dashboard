import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" name="Time" tick={{ fontSize: 12 }} />
          <YAxis dataKey="value" name="Heart Rate (BPM)" domain={[50, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Scatter name="Heart Rate Data" data={heartRateData} fill="#0088FE" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeartRateScatterPlot;
