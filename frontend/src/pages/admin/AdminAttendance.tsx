import { useState, useEffect } from 'react';
import { getAttendanceRecords, saveAttendanceRecords, AttendanceRecord, exportToCSV } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Edit2, Save, X, Users, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminAttendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AttendanceRecord>>({});
  const [dateFilter, setDateFilter] = useState('');
  const { toast } = useToast();

  useEffect(() => { setRecords(getAttendanceRecords()); }, []);

  const filtered = dateFilter ? records.filter(r => r.date === dateFilter) : records;

  const startEdit = (r: AttendanceRecord) => {
    setEditId(r.id);
    setEditData({ ...r });
  };

  const saveEdit = () => {
    const updated = records.map(r => r.id === editId ? { ...r, ...editData } as AttendanceRecord : r);
    setRecords(updated);
    saveAttendanceRecords(updated);
    setEditId(null);
    toast({ title: 'Attendance updated' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" /> Employee Attendance
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="h-8 bg-transparent border-0 p-0 w-36" />
            {dateFilter && <button onClick={() => setDateFilter('')} className="text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>}
          </div>
          <Button variant="outline" onClick={() => exportToCSV(filtered as unknown as Record<string, unknown>[], 'anivex-attendance.csv')}>
            <Download className="w-4 h-4 mr-2" /> CSV
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Employee</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Check In</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Check Out</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-center p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                {editId === r.id ? (
                  <>
                    <td className="p-3"><Input value={editData.employeeName} onChange={e => setEditData({ ...editData, employeeName: e.target.value })} className="h-8" /></td>
                    <td className="p-3"><Input type="date" value={editData.date} onChange={e => setEditData({ ...editData, date: e.target.value })} className="h-8" /></td>
                    <td className="p-3"><Input type="time" value={editData.checkIn} onChange={e => setEditData({ ...editData, checkIn: e.target.value })} className="h-8" /></td>
                    <td className="p-3"><Input type="time" value={editData.checkOut} onChange={e => setEditData({ ...editData, checkOut: e.target.value })} className="h-8" /></td>
                    <td className="p-3">
                      <select
                        value={editData.status}
                        onChange={e => setEditData({ ...editData, status: e.target.value as 'Present' | 'Absent' })}
                        className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                    <td className="p-3 text-center space-x-1">
                      <Button size="icon" variant="ghost" onClick={saveEdit}><Save className="w-4 h-4 text-green-600" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setEditId(null)}><X className="w-4 h-4 text-destructive" /></Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 text-foreground font-medium">{r.employeeName}</td>
                    <td className="p-3 text-foreground">{r.date}</td>
                    <td className="p-3 text-foreground">{r.checkIn || '-'}</td>
                    <td className="p-3 text-foreground">{r.checkOut || '-'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(r)}><Edit2 className="w-4 h-4 text-primary" /></Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttendance;
