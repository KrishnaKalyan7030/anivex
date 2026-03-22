import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Droplets, LogIn, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Stage = 'credentials' | 'otp' | 'verified';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState<Stage>('credentials');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError('Please fill all fields'); return; }
    const result = login(username, password);
    if (result.success) {
      setStage('otp');
      toast({ title: 'OTP Sent', description: 'A 6-digit OTP has been sent to your device.' });
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) { setError('Enter a valid 6-digit OTP'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage('verified');
      toast({ title: 'OTP Verified', description: 'Login successful!' });
      const session = localStorage.getItem('anivex_session');
      if (session) {
        const user = JSON.parse(session);
        navigate(user.role === 'admin' ? '/admin' : '/employee');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-primary/10 rounded-full p-3 mb-3">
              <Droplets className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-sm mt-1">Login to Anivex</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4 flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          {stage === 'credentials' && (
            <form onSubmit={handleCredentials} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Username</label>
                <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
              </div>
              <Button type="submit" className="w-full"><LogIn className="w-4 h-4 mr-2" /> Continue</Button>
              <div className="flex justify-between text-sm">
                <Link to="/forgot-password" className="text-primary hover:underline">Forgot Password?</Link>
                <Link to="/register" className="text-primary hover:underline">Create Account</Link>
              </div>
            </form>
          )}

          {stage === 'otp' && (
            <form onSubmit={handleOtp} className="space-y-4">
              <div className="text-center mb-2">
                <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Enter the 6-digit OTP sent to your device</p>
              </div>
              <Input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="text-center text-2xl tracking-[0.5em] font-mono" maxLength={6} />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</> : 'Verify OTP'}
              </Button>
            </form>
          )}

          {stage === 'verified' && (
            <div className="text-center py-6">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-medium text-foreground">OTP Verified Successfully!</p>
              <p className="text-sm text-muted-foreground mt-1">Redirecting...</p>
            </div>
          )}

          <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Demo Admin:</p>
            <p>Username: <code className="text-primary">admin</code> | Password: <code className="text-primary">admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
