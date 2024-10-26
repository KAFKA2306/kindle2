import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book } from '@/types/book';

interface RatingDistributionProps {
  books: Book[];
}

export const RatingDistribution = ({ books }: RatingDistributionProps) => {
  const ratingDistribution = React.useMemo(() => {
    const distribution = books.reduce<Record<number, number>>((acc, book) => {
      if (book.評価) {
        acc[book.評価] = (acc[book.評価] || 0) + 1;
      }
      return acc;
    }, {});

    return Array.from({ length: 5 }, (_, i) => ({
      rating: i + 1,
      count: distribution[i + 1] || 0
    }));
  }, [books]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>評価分布</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ratingDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [value, '書籍数']}
              labelFormatter={(label) => `${label}星`}
            />
            <Bar 
              dataKey="count" 
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};