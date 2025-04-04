import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Sector } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#4F46E5', '#E0E7FF']; 

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 6) * cos;
  const sy = cy + (outerRadius + 6) * sin;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#333" className="font-semibold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters ** 2);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      determineBMICategory(bmiValue);
    }
  };

  const determineBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  const data = [
    { name: 'BMI', value: bmi },
    { name: 'Remaining', value: 100 - bmi },
  ];

  const genderData = [
    { name: 'Underweight', men: 20, women: 15 },
    { name: 'Normal weight', men: 60, women: 65 },
    { name: 'Overweight', men: 15, women: 15 },
    { name: 'Obese', men: 5, women: 5 },
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
              <span className="text-sm font-medium text-slate-500">{category}</span>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <PieChart width={250} height={250}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                onClick={(_, index) => setActiveIndex(index)}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <h2 className="text-lg font-bold text-center">BMI Distribution by Gender</h2>
          <BarChart
            width={400}
            height={300}
            data={genderData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="men" fill="#4F46E5" name="Men" />
            <Bar dataKey="women" fill="#22C55E" name="Women" />
          </BarChart>

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
