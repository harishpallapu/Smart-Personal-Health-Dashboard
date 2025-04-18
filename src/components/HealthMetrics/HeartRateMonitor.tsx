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

// Function to calculate trend line (linear regression)
const calculateTrendLine = (data: { hour: number; value: number }[]) => {
  const n = data.length;
  const xData = data.map(d => d.hour);
  const yData = data.map(d => d.value);

  const xMean = xData.reduce((a, b) => a + b, 0) / n;
  const yMean = yData.reduce((a, b) => a + b, 0) / n;

  const numerator = xData.reduce((sum, x, i) => sum + (x - xMean) * (yData[i] - yMean), 0);
  const denominator = xData.reduce((sum, x) => sum + (x - xMean) ** 2, 0);

  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;

  return xData.map(x => ({
    hour: x,
    time: `${String(x).padStart(2, '0')}:00`,
    value: slope * x + intercept,
  }));
};

const HeartRateScatterPlot: React.FC = () => {
  const [heartRateData, setHeartRateData] = useState<{ hour: number; time: string; value: number }[]>([]);
  const [trendData, setTrendData] = useState<{ hour: number; time: string; value: number }[]>([]);

  useEffect(() => {
    const generateData = Array.from({ length: 24 }, (_, hour) => {
      const baseValue = 70;
      const randomVariation = Math.floor(Math.random() * 20) - 10;
      return {
        hour,
        time: `${String(hour).padStart(2, '0')}:00`,
        value: baseValue + randomVariation,
      };
    });

    setHeartRateData(generateData);
    setTrendData(calculateTrendLine(generateData));
  }, []);

  // Slanting reference line from (0, 0) to (23, 23)
  const referenceLineData = [
    { hour: 0, time: '00:00', value: 0 },
    { hour: 23, time: '23:00', value: 23 },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={heartRateData} margin={{ top: 20, right: 30, bottom: 30, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: 'Time of Day', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]} // Keep full scale to visualize both heart rate and slanting line
            label={{ value: 'Heart Rate (BPM)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff6b6b"
            dot={{ r: 4 }}
            name="Heart Rate"
          />
          <Line
            type="monotone"
            data={trendData}
            dataKey="value"
            stroke="#8884d8"
            strokeDasharray="5 5"
            dot={false}
            name="Trend Line"
          />
          <Line
            type="linear"
            data={referenceLineData}
            dataKey="value"
            stroke="#4caf50"
            strokeWidth={2}
            dot={false}
            name="X=Y Line"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeartRateScatterPlot;
