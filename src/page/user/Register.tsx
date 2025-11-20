import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const handleRegister = async () => {
    setError({});
    const newError: typeof error = {};

    if (!name) newError.name = 'Nama wajib diisi';
    if (!email) newError.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Email tidak valid';
    if (!phone) newError.phone = 'Nomor handphone wajib diisi';
    if (!password) newError.password = 'Password wajib diisi';
    if (password && password.length < 6)
      newError.password = 'Password minimal 6 karakter';
    if (confirmPassword !== password)
      newError.confirmPassword = 'Konfirmasi password tidak cocok';

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/register', {
        name,
        email,
        phone,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError({
        general: axiosError.response?.data?.message || 'Register gagal',
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
          <h1 className='text-2xl md:text-[28px] font-bold'>Register</h1>
          <p className='text-sm md:text-[16px] font-semibold'>
            Create your account to manage your library.
          </p>
        </div>

        {/* Name Input */}
        <div className='space-y-2'>
          <Label htmlFor='name'>Nama</Label>
          <Input
            id='name'
            type='text'
            placeholder='Nama'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border ${error.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.name && <p className='text-red-500 text-sm'>{error.name}</p>}
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
            className={`border ${error.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}
        </div>

        {/* Phone Input */}
        <div className='space-y-2'>
          <Label htmlFor='phone'>Nomor Handphone</Label>
          <Input
            id='phone'
            type='text'
            placeholder='Nomor Handphone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`border ${error.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.phone && <p className='text-red-500 text-sm'>{error.phone}</p>}
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
              className='flex-1 border-none outline-none px-2'
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

        {/* Confirm Password Input */}
        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <div
            className={`flex items-center border rounded-lg overflow-hidden ${error.confirmPassword ? 'border-red-500' : ''}`}
          >
            <Input
              id='confirmPassword'
              type={showConfirm ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='flex-1 border-none outline-none px-2'
            />
            <button
              type='button'
              onClick={() => setShowConfirm(!showConfirm)}
              className='px-2 text-gray-500 flex items-center justify-center'
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error.confirmPassword && (
            <p className='text-red-500 text-sm'>{error.confirmPassword}</p>
          )}
        </div>

        {/* General Error */}
        {error.general && (
          <p className='text-red-500 text-sm text-center'>{error.general}</p>
        )}

        {/* Register Button */}
        <Button className='w-full' onClick={handleRegister} disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </Button>

        {/* Login Link */}
        <h2 className='lg:text-[16px] font-semibold text-center'>
          Already have an account?
          <span
            className='text-[#1C65DA] cursor-pointer'
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </h2>
      </div>
    </div>
  );
}
