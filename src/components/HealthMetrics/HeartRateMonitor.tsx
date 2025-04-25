import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const HeartRateScatterPlot: React.FC = () => {
  const [heartRateData, setHeartRateData] = useState<{ time: string; value: number }[]>([]);
  const [time, setTime] = useState('');
  const [heartRate, setHeartRate] = useState<number | ''>('');

  const handleAddData = () => {
    if (!time || heartRate === '') {
      alert('Please enter both time and heart rate!');
      return;
    }

    setHeartRateData(prev => [...prev, { time, value: Number(heartRate) }]);
    setTime('');
    setHeartRate('');
  };

  return (
    <div style={{ width: '100%', height: 400, padding: 20 }}>
      {/* Input Fields */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ marginRight: 10, padding: 8, borderRadius: 5, border: '1px solid gray' }}
        />
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(Number(e.target.value))}
          placeholder="Heart Rate (BPM)"
          style={{ marginRight: 10, padding: 8, borderRadius: 5, border: '1px solid gray' }}
        />
        <button
          onClick={handleAddData}
          style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: 5 }}
        >
          Add Data
        </button>
      </div>

      {/* Graph */}
      <ResponsiveContainer width="100%" height="80%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" type="category" label={{ value: 'Time of Day', position: 'insideBottom', offset: -5 }} />
          <YAxis dataKey="value" type="number" domain={[0, 150]} label={{ value: 'Heart Rate (BPM)', angle: -90, position: 'insideLeft' }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Heart Rate" data={heartRateData} fill="#ff6b6b" line shape="circle" />
          <Line
            type="monotone"
            data={heartRateData}
            dataKey="value"
            stroke="#ff0000"
            strokeWidth={2}
            dot={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeartRateScatterPlot;
