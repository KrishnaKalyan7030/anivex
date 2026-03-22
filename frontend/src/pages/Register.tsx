import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/lib/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplets, UserPlus, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [employeeCode, setEmployeeCode] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !username || !email || !password) { setError('Please fill all required fields'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (role === 'employee' && !employeeCode) { setError('Employee code is required'); return; }
    const result = register({ name, username, email, password, phone, role, employeeCode: role === 'employee' ? employeeCode : undefined });
    if (result.success) {
      toast({ title: 'Registration Successful', description: 'Please login with your credentials.' });
      navigate('/login');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-primary/10 rounded-full p-3 mb-3">
              <Droplets className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground text-sm mt-1">Join Anivex</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4 flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name *</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Username *</label>
              <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email *</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password *</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone (optional)</label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Role *</label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {role === 'employee' && (
              <div>
                <label className="text-sm font-medium text-foreground">Employee Code *</label>
                <Input value={employeeCode} onChange={e => setEmployeeCode(e.target.value)} placeholder="Unique employee ID" />
              </div>
            )}
            <Button type="submit" className="w-full"><UserPlus className="w-4 h-4 mr-2" /> Register</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
