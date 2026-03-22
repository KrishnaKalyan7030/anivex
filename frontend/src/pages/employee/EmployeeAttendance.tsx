import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { getAttendanceRecords, saveAttendanceRecords } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const todayStr = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

const EmployeeAttendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const records = getAttendanceRecords();
    const today = records.find(r => r.employeeName === user.name && r.date === todayStr());
    if (today) {
      if (today.checkIn) setCheckInTime(today.checkIn);
      if (today.checkOut) setCheckOutTime(today.checkOut);
    }
  }, [user]);

  const handleCheckIn = () => {
    if (!user) return;
    const time = nowTime();
    const records = getAttendanceRecords();
    records.push({
      id: crypto.randomUUID(),
      employeeName: user.name,
      date: todayStr(),
      checkIn: time,
      checkOut: '',
      status: 'Present',
    });
    saveAttendanceRecords(records);
    setCheckInTime(time);
    toast({ title: 'Checked In', description: `You checked in at ${time}` });
  };

  const handleCheckOut = () => {
    if (!user) return;
    const time = nowTime();
    const records = getAttendanceRecords();
    const idx = records.findIndex(r => r.employeeName === user.name && r.date === todayStr() && !r.checkOut);
    if (idx !== -1) {
      records[idx].checkOut = time;
      saveAttendanceRecords(records);
      setCheckOutTime(time);
      toast({ title: 'Checked Out', description: `You checked out at ${time}` });
    }
  };

  const alreadyDone = checkInTime && checkOutTime;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
        <ClipboardCheck className="w-6 h-6 text-primary" /> Mark Attendance
      </h2>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        {alreadyDone && (
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3 text-muted-foreground">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">You can mark attendance only once today.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-6 text-center space-y-3">
            <Clock className="w-8 h-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Check In</p>
            {checkInTime ? (
              <p className="text-xl font-bold text-foreground">{checkInTime}</p>
            ) : (
              <Button onClick={handleCheckIn} className="w-full" size="lg">
                Check In
              </Button>
            )}
          </div>

          <div className="bg-muted/50 rounded-xl p-6 text-center space-y-3">
            <Clock className="w-8 h-8 text-accent mx-auto" />
            <p className="text-sm text-muted-foreground">Check Out</p>
            {checkOutTime ? (
              <p className="text-xl font-bold text-foreground">{checkOutTime}</p>
            ) : checkInTime ? (
              <Button onClick={handleCheckOut} variant="outline" className="w-full" size="lg">
                Check Out
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Check in first</p>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Date: <span className="font-medium text-foreground">{todayStr()}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
