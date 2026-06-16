import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import FluidBackground from '@/components/FluidBackground';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FluidBackground isActive={true} />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: '24px', left: '24px', zIndex: 100,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '40px', padding: '10px 20px', color: '#fff',
          fontSize: '13px', cursor: 'pointer', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease',
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Login Card */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px',
        margin: '20px',
      }}>
        <div style={{
          background: 'rgba(11, 18, 25, 0.85)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(48, 176, 208, 0.2)', borderRadius: '16px',
          padding: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(48, 176, 208, 0.05)',
        }}>
          {/* Brand */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Sparkles size={24} color="#fff" />
            </div>
            <h1 style={{
              fontSize: '24px', fontWeight: 300, color: '#EDE8E4',
              fontFamily: 'Noto Serif SC, serif', marginBottom: '8px',
            }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: '14px', color: '#8A96A6' }}>
              Sign in to your ObsidianHire account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                style={{
                  width: '100%', padding: '12px 16px', background: '#111A24',
                  border: '1px solid #1E2A36', borderRadius: '8px',
                  color: '#EDE8E4', fontSize: '14px', outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#30B0D0'}
                onBlur={e => e.currentTarget.style.borderColor = '#1E2A36'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%', padding: '12px 44px 12px 16px', background: '#111A24',
                    border: '1px solid #1E2A36', borderRadius: '8px',
                    color: '#EDE8E4', fontSize: '14px', outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#30B0D0'}
                  onBlur={e => e.currentTarget.style.borderColor = '#1E2A36'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#30B0D0' }} />
                <span style={{ fontSize: '13px', color: '#8A96A6' }}>Remember me</span>
              </label>
              <button type="button" style={{ background: 'none', border: 'none', color: '#30B0D0', fontSize: '13px', cursor: 'pointer' }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', padding: '14px', background: isLoading ? 'rgba(48,176,208,0.5)' : 'linear-gradient(135deg, #30B0D0, #0F5959)',
                border: 'none', borderRadius: '8px', color: '#fff',
                fontSize: '14px', fontWeight: 400, letterSpacing: '0.1em',
                cursor: isLoading ? 'wait' : 'pointer', transition: 'all 0.3s ease',
              }}
            >
              {isLoading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#1E2A36' }} />
            <span style={{ fontSize: '12px', color: '#8A96A6' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#1E2A36' }} />
          </div>

          {/* Social login */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Google', 'GitHub'].map(provider => (
              <button
                key={provider}
                style={{
                  flex: 1, padding: '10px', background: '#111A24',
                  border: '1px solid #1E2A36', borderRadius: '8px',
                  color: '#EDE8E4', fontSize: '13px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#30B0D0'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; }}
              >
                {provider}
              </button>
            ))}
          </div>

          {/* Register link */}
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#8A96A6' }}>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{ background: 'none', border: 'none', color: '#30B0D0', cursor: 'pointer', fontSize: '13px' }}
            >
              Get Started
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
