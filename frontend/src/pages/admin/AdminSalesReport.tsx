import { useState, useEffect } from 'react';
import { getSalesRecords, saveSalesRecords, SalesRecord, exportToCSV } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Edit2, Save, X, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminSalesReport = () => {
  const [records, setRecords] = useState<SalesRecord[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SalesRecord>>({});
  const { toast } = useToast();

  useEffect(() => { setRecords(getSalesRecords()); }, []);

  const startEdit = (r: SalesRecord) => {
    setEditId(r.id);
    setEditData({ ...r });
  };

  const saveEdit = () => {
    const updated = records.map(r => r.id === editId ? { ...r, ...editData, amount: Number(editData.amount), itemsSold: Number(editData.itemsSold) } as SalesRecord : r);
    setRecords(updated);
    saveSalesRecords(updated);
    setEditId(null);
    toast({ title: 'Record updated' });
  };

  const totalSales = records.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Sales Report
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Total Sales: ₹{totalSales.toLocaleString()}</p>
        </div>
        <Button variant="outline" onClick={() => exportToCSV(records as unknown as Record<string, unknown>[], 'anivex-sales-report.csv')}>
          <Download className="w-4 h-4 mr-2" /> Download CSV
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Employee</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Amount (₹)</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Items Sold</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Notes</th>
              <th className="text-center p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                {editId === r.id ? (
                  <>
                    <td className="p-3"><Input type="date" value={editData.date} onChange={e => setEditData({ ...editData, date: e.target.value })} className="h-8" /></td>
                    <td className="p-3"><Input value={editData.employeeName} onChange={e => setEditData({ ...editData, employeeName: e.target.value })} className="h-8" /></td>
                    <td className="p-3"><Input type="number" value={editData.amount} onChange={e => setEditData({ ...editData, amount: +e.target.value })} className="h-8" /></td>
                    <td className="p-3"><Input type="number" value={editData.itemsSold} onChange={e => setEditData({ ...editData, itemsSold: +e.target.value })} className="h-8" /></td>
                    <td className="p-3"><Input value={editData.notes} onChange={e => setEditData({ ...editData, notes: e.target.value })} className="h-8" /></td>
                    <td className="p-3 text-center space-x-1">
                      <Button size="icon" variant="ghost" onClick={saveEdit}><Save className="w-4 h-4 text-green-600" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setEditId(null)}><X className="w-4 h-4 text-destructive" /></Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 text-foreground">{r.date}</td>
                    <td className="p-3 text-foreground">{r.employeeName}</td>
                    <td className="p-3 text-foreground font-medium">₹{r.amount.toLocaleString()}</td>
                    <td className="p-3 text-foreground">{r.itemsSold}</td>
                    <td className="p-3 text-muted-foreground">{r.notes || '-'}</td>
                    <td className="p-3 text-center">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(r)}><Edit2 className="w-4 h-4 text-primary" /></Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalesReport;
