import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Globe, LogOut, ShieldAlert } from 'lucide-react';
import { Language } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import AttendancePanel from '@/components/AttendancePanel';
import SalesPanel from '@/components/SalesPanel';

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'mr', label: 'मरा' },
    { code: 'hi', label: 'हिं' },
  ];

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // Not admin → show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <div className="text-center bg-card rounded-2xl p-8 border border-border shadow-water max-w-md">
          <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">{t('access_denied')}</h1>
          <p className="text-muted-foreground mb-6">{t('access_denied_msg')}</p>
          <Link to="/dashboard">
            <Button className="gradient-water text-primary-foreground font-display">{t('go_dashboard')}</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <span className="hidden sm:inline font-display text-primary-foreground/70 text-sm">| {t('admin_title')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-primary-foreground/70" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded-lg font-display text-xs font-medium transition-all ${
                    lang === l.code ? 'bg-primary-foreground text-water-deep' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <span className="text-primary-foreground/70 text-sm hidden sm:inline">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={logout} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-1" /> {t('logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <h1 className="font-display font-bold text-3xl text-foreground">{t('admin_title')}</h1>
        <AttendancePanel />
        <SalesPanel />
      </main>
    </div>
  );
};

export default AdminDashboard;
