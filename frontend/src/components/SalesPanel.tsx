import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Plus, Trash2, Edit2, Save, X, BarChart3 } from 'lucide-react';

interface SaleEntry {
  id: string;
  date: string;
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

const SalesPanel = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<SaleEntry[]>([]);
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], description: '', quantity: '', rate: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SaleEntry>>({});

  useEffect(() => {
    const saved = localStorage.getItem('anivex_sales');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const save = (data: SaleEntry[]) => {
    setEntries(data);
    localStorage.setItem('anivex_sales', JSON.stringify(data));
  };

  const addSale = () => {
    if (!form.description.trim() || !form.quantity || !form.rate) return;
    const qty = parseFloat(form.quantity);
    const rate = parseFloat(form.rate);
    const entry: SaleEntry = {
      id: Date.now().toString(),
      date: form.date,
      description: form.description.trim(),
      quantity: qty,
      rate,
      total: qty * rate,
    };
    save([...entries, entry]);
    setForm({ date: new Date().toISOString().split('T')[0], description: '', quantity: '', rate: '' });
  };

  const deleteEntry = (id: string) => save(entries.filter(e => e.id !== id));

  const startEdit = (entry: SaleEntry) => {
    setEditId(entry.id);
    setEditData(entry);
  };

  const saveEdit = () => {
    if (!editId) return;
    const qty = editData.quantity || 0;
    const rate = editData.rate || 0;
    save(entries.map(e => e.id === editId ? { ...e, ...editData, total: qty * rate } : e));
    setEditId(null);
  };

  const totalSales = entries.reduce((sum, e) => sum + e.total, 0);

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          {t('admin_sales')}
        </h3>
        <div className="px-4 py-2 rounded-xl gradient-water text-primary-foreground font-display font-bold">
          {t('admin_total_sales')}: ₹{totalSales.toLocaleString()}
        </div>
      </div>

      {/* Add form */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none" />
        <input placeholder={t('admin_description')} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none" />
        <input type="number" placeholder={t('admin_quantity')} value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none" />
        <input type="number" placeholder={t('admin_rate')} value={form.rate} onChange={e => setForm({ ...form, rate: e.target.value })} className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none" />
        <button onClick={addSale} className="px-6 py-2.5 rounded-lg gradient-water text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
          <Plus className="w-4 h-4" /> {t('admin_add_sale')}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_sr')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_date')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_description')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_quantity')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_rate')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_total')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_actions')}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={entry.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-4 font-body text-muted-foreground">{i + 1}</td>
                <td className="py-3 px-4 font-body text-muted-foreground">
                  {editId === entry.id ? <input type="date" value={editData.date || ''} onChange={e => setEditData({ ...editData, date: e.target.value })} className="px-2 py-1 rounded border border-input bg-background text-foreground" /> : entry.date}
                </td>
                <td className="py-3 px-4 font-body text-foreground">
                  {editId === entry.id ? <input value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} className="px-2 py-1 rounded border border-input bg-background text-foreground w-full" /> : entry.description}
                </td>
                <td className="py-3 px-4 font-body text-foreground">
                  {editId === entry.id ? <input type="number" value={editData.quantity || ''} onChange={e => setEditData({ ...editData, quantity: parseFloat(e.target.value) })} className="px-2 py-1 rounded border border-input bg-background text-foreground w-20" /> : entry.quantity}
                </td>
                <td className="py-3 px-4 font-body text-foreground">
                  {editId === entry.id ? <input type="number" value={editData.rate || ''} onChange={e => setEditData({ ...editData, rate: parseFloat(e.target.value) })} className="px-2 py-1 rounded border border-input bg-background text-foreground w-20" /> : `₹${entry.rate}`}
                </td>
                <td className="py-3 px-4 font-display font-bold text-primary">₹{entry.total.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    {editId === entry.id ? (
                      <>
                        <button onClick={saveEdit} className="p-1.5 rounded-lg bg-accent text-accent-foreground hover:opacity-80"><Save className="w-3.5 h-3.5" /></button>
                        <button onClick={() => setEditId(null)} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:opacity-80"><X className="w-3.5 h-3.5" /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(entry)} className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:opacity-80"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteEntry(entry.id)} className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:opacity-80"><Trash2 className="w-3.5 h-3.5" /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-muted-foreground font-body">No sales entries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPanel;
