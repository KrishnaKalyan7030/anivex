import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { getSalesRecords, saveSalesRecords } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const todayStr = () => new Date().toISOString().slice(0, 10);

const EmployeeSales = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState('');
  const [notes, setNotes] = useState('');
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (!user) return;
    const records = getSalesRecords();
    const alreadyPosted = records.some(r => r.employeeName === user.name && r.date === todayStr());
    setPosted(alreadyPosted);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !amount || !items) return;
    const records = getSalesRecords();
    records.push({
      id: crypto.randomUUID(),
      date: todayStr(),
      employeeName: user.name,
      amount: Number(amount),
      itemsSold: Number(items),
      notes,
    });
    saveSalesRecords(records);
    setPosted(true);
    toast({ title: 'Sales Posted', description: 'Your daily sales have been submitted.' });
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-primary" /> Post Daily Sales
      </h2>

      <div className="bg-card rounded-xl border border-border p-6">
        {posted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <p className="font-medium text-foreground">Sales already posted for today</p>
            <p className="text-sm text-muted-foreground">Come back tomorrow to post new sales.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Date</label>
              <Input value={todayStr()} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Total Sales Amount (₹) *</label>
              <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Number of Items Sold *</label>
              <Input type="number" value={items} onChange={e => setItems(e.target.value)} placeholder="Enter count" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Notes (optional)</label>
              <Input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional notes" />
            </div>
            <Button type="submit" className="w-full">Post Sales</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmployeeSales;
