import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book } from '@/types/book';

interface ReadingInsightsProps {
  books: Book[];
}

export const ReadingInsights = ({ books }: ReadingInsightsProps) => {
  const categoryReadingStats = React.useMemo(() => {
    const stats = books.reduce<Record<string, { total: number; read: number }>>((acc, book) => {
      const category = book.メインカテゴリ;
      if (!acc[category]) {
        acc[category] = { total: 0, read: 0 };
      }
      acc[category].total += 1;
      if (book.読了 > 0) acc[category].read += 1;
      return acc;
    }, {});

    return Object.entries(stats).map(([category, { total, read }]) => ({
      category,
      readRatio: (read / total) * 100,
      total,
      read,
    }));
  }, [books]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>カテゴリー別読了率</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryReadingStats} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} unit="%" />
            <YAxis dataKey="category" type="category" width={100} />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}%`, '読了率']}
              labelFormatter={(label) => `カテゴリー: ${label}`}
            />
            <Bar 
              dataKey="readRatio" 
              fill="#10B981"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};