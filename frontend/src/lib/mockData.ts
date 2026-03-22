export interface SalesRecord {
  id: string;
  date: string;
  employeeName: string;
  amount: number;
  itemsSold: number;
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent';
}

const SALES_KEY = 'anivex_sales_records';
const ATTENDANCE_KEY = 'anivex_attendance_records';

function seedIfEmpty<T>(key: string, defaultData: T[]): T[] {
  const existing = localStorage.getItem(key);
  if (existing) {
    try { return JSON.parse(existing); } catch { /* fall through */ }
  }
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
}

const defaultSales: SalesRecord[] = [
  { id: '1', date: '2026-03-10', employeeName: 'Rahul Patil', amount: 4500, itemsSold: 30, notes: 'Regular delivery' },
  { id: '2', date: '2026-03-11', employeeName: 'Suresh Kumar', amount: 3200, itemsSold: 22, notes: 'New area coverage' },
  { id: '3', date: '2026-03-12', employeeName: 'Rahul Patil', amount: 5100, itemsSold: 35, notes: 'Festival demand' },
  { id: '4', date: '2026-03-13', employeeName: 'Amit Jadhav', amount: 2800, itemsSold: 18, notes: '' },
  { id: '5', date: '2026-03-14', employeeName: 'Suresh Kumar', amount: 3900, itemsSold: 26, notes: 'Bulk order' },
];

const defaultAttendance: AttendanceRecord[] = [
  { id: '1', employeeName: 'Rahul Patil', date: '2026-03-10', checkIn: '09:00', checkOut: '18:00', status: 'Present' },
  { id: '2', employeeName: 'Suresh Kumar', date: '2026-03-10', checkIn: '09:15', checkOut: '17:45', status: 'Present' },
  { id: '3', employeeName: 'Amit Jadhav', date: '2026-03-10', checkIn: '', checkOut: '', status: 'Absent' },
  { id: '4', employeeName: 'Rahul Patil', date: '2026-03-11', checkIn: '08:55', checkOut: '18:10', status: 'Present' },
  { id: '5', employeeName: 'Suresh Kumar', date: '2026-03-11', checkIn: '09:30', checkOut: '18:00', status: 'Present' },
  { id: '6', employeeName: 'Amit Jadhav', date: '2026-03-11', checkIn: '09:00', checkOut: '17:30', status: 'Present' },
];

export function getSalesRecords(): SalesRecord[] {
  return seedIfEmpty(SALES_KEY, defaultSales);
}

export function saveSalesRecords(records: SalesRecord[]) {
  localStorage.setItem(SALES_KEY, JSON.stringify(records));
}

export function getAttendanceRecords(): AttendanceRecord[] {
  return seedIfEmpty(ATTENDANCE_KEY, defaultAttendance);
}

export function saveAttendanceRecords(records: AttendanceRecord[]) {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
}

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => `"${row[h] ?? ''}"`).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
