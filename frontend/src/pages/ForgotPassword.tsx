import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Droplets, AlertCircle, Loader2, ShieldCheck, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Stage = 'username' | 'otp' | 'reset' | 'done';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState<Stage>('username');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userExists, resetPassword } = useAuth();
  const { toast } = useToast();

  const handleUsername = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username) { setError('Enter your username'); return; }
    if (!userExists(username)) { setError('Username not found'); return; }
    setStage('otp');
    toast({ title: 'OTP Sent', description: 'A verification OTP has been sent.' });
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) { setError('Enter a valid 6-digit OTP'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage('reset');
      toast({ title: 'OTP Verified' });
    }, 2000);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) { setError('Min 6 characters'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    const result = resetPassword(username, newPassword);
    if (result.success) {
      setStage('done');
      toast({ title: 'Password Reset', description: 'You can now login with your new password.' });
    } else {
      setError(result.error || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-primary/10 rounded-full p-3 mb-3">
              <Droplets className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Reset Password</h1>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4 flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          {stage === 'username' && (
            <form onSubmit={handleUsername} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Username</label>
                <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" />
              </div>
              <Button type="submit" className="w-full">Send OTP</Button>
            </form>
          )}

          {stage === 'otp' && (
            <form onSubmit={handleOtp} className="space-y-4">
              <div className="text-center mb-2">
                <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Enter the 6-digit OTP</p>
              </div>
              <Input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="text-center text-2xl tracking-[0.5em] font-mono" maxLength={6} />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</> : 'Verify OTP'}
              </Button>
            </form>
          )}

          {stage === 'reset' && (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="text-center mb-2">
                <KeyRound className="w-10 h-10 text-primary mx-auto mb-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">New Password</label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 6 characters" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" />
              </div>
              <Button type="submit" className="w-full">Reset Password</Button>
            </form>
          )}

          {stage === 'done' && (
            <div className="text-center py-6">
              <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="font-medium text-foreground">Password Reset Successfully!</p>
              <Link to="/login" className="text-primary hover:underline text-sm mt-2 inline-block">Go to Login</Link>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-4">
            <Link to="/login" className="text-primary hover:underline">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
