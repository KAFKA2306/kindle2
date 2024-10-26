import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyStats } from '@/types/book';

interface MonthlyTrendsProps {
  data: MonthlyStats[];
}

export const MonthlyTrends = ({ data }: MonthlyTrendsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>月別購入・読了推移</CardTitle>
    </CardHeader>
    <CardContent className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            padding={{ left: 30, right: 30 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
            width={40}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tick={{ fontSize: 12 }}
            width={40}
          />
          <Tooltip />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="count" 
            stroke="#F59E0B" 
            name="購入数"
            strokeWidth={2}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="readRatio" 
            stroke="#10B981" 
            name="読了率"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);