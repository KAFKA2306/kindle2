import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book } from '@/types/book';

interface PurchasePatternsProps {
  books: Book[];
}

export const PurchasePatterns = ({ books }: PurchasePatternsProps) => {
  const purchasePatterns = React.useMemo(() => {
    const patterns = books.reduce<Record<string, { count: number; totalPrice: number }>>((acc, book) => {
      const date = new Date(book.注文日);
      const dayOfWeek = date.getDay();
      const weekday = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek];
      
      if (!acc[weekday]) {
        acc[weekday] = { count: 0, totalPrice: 0 };
      }
      
      acc[weekday].count += 1;
      acc[weekday].totalPrice += parseFloat(book.価格円?.replace(/,/g, '') || '0');
      
      return acc;
    }, {});

    return ['月', '火', '水', '木', '金', '土', '日'].map(day => ({
      day,
      count: patterns[day]?.count || 0,
      avgPrice: patterns[day] ? patterns[day].totalPrice / patterns[day].count : 0
    }));
  }, [books]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>曜日別購入パターン</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={purchasePatterns}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              name="購入数"
              strokeWidth={2}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="avgPrice" 
              stroke="#EC4899" 
              name="平均価格"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};