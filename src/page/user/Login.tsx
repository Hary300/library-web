import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react'; // <- import icon
import axiosInstance from '@/api/axiosInstance';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  // redirect otomatis kalau sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/home');
  }, []);

  const handleLogin = async () => {
    setError({});
    const newError: typeof error = {};
    if (!email) newError.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Email tidak valid';
    if (!password) newError.password = 'Password wajib diisi';
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError({
        general: axiosError.response?.data?.message || 'Login gagal',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='p-9 md:p-0 max-w-[400px] w-full space-y-4'>
        {/* Logo */}
        <div className='flex gap-3'>
          <img src='/icons/logo.svg' alt='logo library' />
          <p className='text-[#0A0D12] font-bold text-[25.14px]'>Booky</p>
        </div>

        {/* Header */}
        <div className='mb-5'>
          <h1 className='text-2xl md:text-[28px] font-bold'>Login</h1>
          <p className='text-sm md:text-[16px] font-semibold'>
            Sign in to manage your library account.
          </p>
        </div>

        {/* Email Input */}
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error.email ? 'border-red-500' : ''}
          />
          {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}
        </div>

        {/* Password Input */}
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <div
            className={`flex items-center border rounded-lg overflow-hidden ${error.password ? 'border-red-500' : ''}`}
          >
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`flex-1 border-none outline-none px-2 `}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='px-2 text-gray-500 flex items-center justify-center'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error.password && (
            <p className='text-red-500 text-sm'>{error.password}</p>
          )}
        </div>

        {/* General error */}
        {error.general && (
          <p className='text-red-500 text-sm text-center'>{error.general}</p>
        )}

        {/* Login Button */}
        <Button className='w-full' onClick={handleLogin} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>

        {/* Register link */}
        <h2 className='lg:text-[16px] font-semibold text-center'>
          Don't have an account?
          <Link to='/register' className='text-[#1C65DA]'>
            Register
          </Link>
        </h2>
      </div>
    </div>
  );
}
