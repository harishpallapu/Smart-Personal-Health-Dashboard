import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string>('text-slate-700');

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) {
        setCategory('Underweight');
        setColor('text-blue-500');
      } else if (bmiValue < 25) {
        setCategory('Normal weight');
        setColor('text-green-500');
      } else if (bmiValue < 30) {
        setCategory('Overweight');
        setColor('text-yellow-500');
      } else {
        setCategory('Obese');
        setColor('text-red-500');
      }
    }
  };

  const data = [
    { name: 'Underweight', value: bmi < 18.5 ? 100 : 0, color: '#3B82F6' },
    { name: 'Normal weight', value: bmi >= 18.5 && bmi < 25 ? 100 : 0, color: '#10B981' },
    { name: 'Overweight', value: bmi >= 25 && bmi < 30 ? 100 : 0, color: '#F59E0B' },
    { name: 'Obese', value: bmi >= 30 ? 100 : 0, color: '#EF4444' },
  ];

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 border border-slate-200/70">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">BMI Calculator</CardTitle>
            <CardDescription>Calculate your Body Mass Index</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="mb-6 mt-2 text-center">
            <motion.div
              key={bmi}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex flex-col items-center justify-center"
            >
              <span className="text-4xl font-bold mb-1">{bmi}</span>
              <span className={`text-sm font-medium ${color}`}>{category}</span>
            </motion.div>
          </div>
          
          <div className="flex justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Height</label>
                <span className="text-sm text-slate-500">{height} cm</span>
              </div>
              <Slider
                value={[height]}
                min={120}
                max={220}
                step={1}
                onValueChange={(val) => setHeight(val[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Weight</label>
                <span className="text-sm text-slate-500">{weight} kg</span>
              </div>
              <Slider
                value={[weight]}
                min={30}
                max={150}
                step={1}
                onValueChange={(val) => setWeight(val[0])}
                className="py-2"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
