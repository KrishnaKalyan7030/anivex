import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Plus, Trash2, Edit2, Save, X, Clock, LogIn, LogOut } from 'lucide-react';

interface AttendanceEntry {
  id: string;
  name: string;
  date: string;
  inTime: string;
  outTime: string;
}

const AttendancePanel = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AttendanceEntry>>({});

  useEffect(() => {
    const saved = localStorage.getItem('anivex_attendance');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const save = (data: AttendanceEntry[]) => {
    setEntries(data);
    localStorage.setItem('anivex_attendance', JSON.stringify(data));
  };

  const addEntry = () => {
    if (!name.trim()) return;
    const entry: AttendanceEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      date,
      inTime: '',
      outTime: '',
    };
    save([...entries, entry]);
    setName('');
  };

  const markIn = (id: string) => {
    save(entries.map(e => e.id === id ? { ...e, inTime: new Date().toLocaleTimeString() } : e));
  };

  const markOut = (id: string) => {
    save(entries.map(e => e.id === id ? { ...e, outTime: new Date().toLocaleTimeString() } : e));
  };

  const deleteEntry = (id: string) => {
    save(entries.filter(e => e.id !== id));
  };

  const startEdit = (entry: AttendanceEntry) => {
    setEditId(entry.id);
    setEditData(entry);
  };

  const saveEdit = () => {
    if (!editId) return;
    save(entries.map(e => e.id === editId ? { ...e, ...editData } : e));
    setEditId(null);
  };

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border p-6">
      <h3 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        {t('admin_attendance')}
      </h3>

      {/* Add form */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder={t('admin_emp_name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground font-body focus:ring-2 focus:ring-ring outline-none"
        />
        <button onClick={addEntry} className="px-6 py-2.5 rounded-lg gradient-water text-primary-foreground font-display font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" /> {t('admin_add_entry')}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_sr')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_emp_name')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_date')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_in_time')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_out_time')}</th>
              <th className="py-3 px-4 text-left font-display font-semibold text-foreground">{t('admin_actions')}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={entry.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-4 font-body text-muted-foreground">{i + 1}</td>
                <td className="py-3 px-4 font-body text-foreground">
                  {editId === entry.id ? (
                    <input value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} className="px-2 py-1 rounded border border-input bg-background text-foreground w-full" />
                  ) : entry.name}
                </td>
                <td className="py-3 px-4 font-body text-muted-foreground">
                  {editId === entry.id ? (
                    <input type="date" value={editData.date || ''} onChange={e => setEditData({ ...editData, date: e.target.value })} className="px-2 py-1 rounded border border-input bg-background text-foreground" />
                  ) : entry.date}
                </td>
                <td className="py-3 px-4 font-body">
                  {entry.inTime ? (
                    <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">{entry.inTime}</span>
                  ) : (
                    <button onClick={() => markIn(entry.id)} className="px-3 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:opacity-80 flex items-center gap-1">
                      <LogIn className="w-3 h-3" /> {t('admin_mark_in')}
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 font-body">
                  {entry.outTime ? (
                    <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-semibold">{entry.outTime}</span>
                  ) : entry.inTime ? (
                    <button onClick={() => markOut(entry.id)} className="px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold hover:opacity-80 flex items-center gap-1">
                      <LogOut className="w-3 h-3" /> {t('admin_mark_out')}
                    </button>
                  ) : <span className="text-muted-foreground">—</span>}
                </td>
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
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground font-body">No entries yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePanel;
