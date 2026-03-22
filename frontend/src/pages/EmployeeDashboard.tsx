import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplets, Globe, LogOut, User, Clock } from 'lucide-react';
import { Language } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface AttendanceRecord {
  id: string;
  name: string;
  date: string;
  inTime: string;
  outTime: string;
}

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'mr', label: 'मरा' },
    { code: 'hi', label: 'हिं' },
  ];

  const [myRecords, setMyRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Load attendance entries that match this employee's name
    try {
      const all: AttendanceRecord[] = JSON.parse(localStorage.getItem('anivex_attendance') || '[]');
      setMyRecords(all.filter(r => r.name.toLowerCase() === user?.name.toLowerCase()));
    } catch { setMyRecords([]); }
  }, [user]);

  return (
    <div className="min-h-screen bg-muted">
      <header className="gradient-water shadow-water">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Droplets className="w-7 h-7 text-primary-foreground" />
              <span className="font-display font-bold text-xl text-primary-foreground">ANIVEX</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-primary-foreground/70" />
              {languages.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded-lg font-display text-xs font-medium transition-all ${lang === l.code ? 'bg-primary-foreground text-water-deep' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-1" /> {t('logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full gradient-water flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">{t('welcome')}, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">{t('role_employee')} • {user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> {t('my_attendance')}
          </h2>
          {myRecords.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t('no_attendance_records')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t('att_date')}</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t('att_in')}</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t('att_out')}</th>
                  </tr>
                </thead>
                <tbody>
                  {myRecords.map(r => (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-2 px-3 text-foreground">{r.date}</td>
                      <td className="py-2 px-3 text-foreground">{r.inTime || '—'}</td>
                      <td className="py-2 px-3 text-foreground">{r.outTime || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
