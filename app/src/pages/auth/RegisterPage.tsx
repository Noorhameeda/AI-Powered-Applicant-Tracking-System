import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import FluidBackground from '@/components/FluidBackground';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', company: '', role: 'recruiter',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  const roles = [
    { value: 'recruiter', label: 'Recruiter / HR' },
    { value: 'hiring_manager', label: 'Hiring Manager' },
    { value: 'applicant', label: 'Job Seeker' },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FluidBackground isActive={true} />

      <button
        onClick={() => step === 1 ? navigate('/') : setStep(1)}
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

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px', margin: '20px' }}>
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
              {step === 1 ? 'Create Account' : 'Complete Setup'}
            </h1>
            <p style={{ fontSize: '14px', color: '#8A96A6' }}>
              {step === 1 ? 'Start hiring smarter with ObsidianHire' : 'Tell us about your organization'}
            </p>
          </div>

          {/* Progress indicator */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {[1, 2].map(s => (
              <div key={s} style={{
                flex: 1, height: '4px', borderRadius: '2px',
                background: s <= step ? 'linear-gradient(90deg, #30B0D0, #0F5959)' : '#1E2A36',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {step === 1 ? (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Smith"
                    required
                    style={{
                      width: '100%', padding: '12px 16px', background: '#111A24',
                      border: '1px solid #1E2A36', borderRadius: '8px',
                      color: '#EDE8E4', fontSize: '14px', outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#30B0D0'}
                    onBlur={e => e.currentTarget.style.borderColor = '#1E2A36'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    required
                    style={{
                      width: '100%', padding: '12px 16px', background: '#111A24',
                      border: '1px solid #1E2A36', borderRadius: '8px',
                      color: '#EDE8E4', fontSize: '14px', outline: 'none',
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
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 8 characters"
                      required
                      style={{
                        width: '100%', padding: '12px 44px 12px 16px', background: '#111A24',
                        border: '1px solid #1E2A36', borderRadius: '8px',
                        color: '#EDE8E4', fontSize: '14px', outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#30B0D0'}
                      onBlur={e => e.currentTarget.style.borderColor = '#1E2A36'}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer' }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                    required
                    style={{
                      width: '100%', padding: '12px 16px', background: '#111A24',
                      border: '1px solid #1E2A36', borderRadius: '8px',
                      color: '#EDE8E4', fontSize: '14px', outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#30B0D0'}
                    onBlur={e => e.currentTarget.style.borderColor = '#1E2A36'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    I am a
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {roles.map(r => (
                      <label key={r.value} style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                        background: formData.role === r.value ? 'rgba(48,176,208,0.1)' : '#111A24',
                        border: `1px solid ${formData.role === r.value ? '#30B0D0' : '#1E2A36'}`,
                        borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
                      }}>
                        <input
                          type="radio" name="role" value={r.value}
                          checked={formData.role === r.value}
                          onChange={e => setFormData({ ...formData, role: e.target.value })}
                          style={{ accentColor: '#30B0D0' }}
                        />
                        <div>
                          <div style={{ fontSize: '14px', color: '#EDE8E4' }}>{r.label}</div>
                        </div>
                        {formData.role === r.value && <CheckCircle size={18} color="#30B0D0" style={{ marginLeft: 'auto' }} />}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', padding: '14px',
                background: isLoading ? 'rgba(48,176,208,0.5)' : 'linear-gradient(135deg, #30B0D0, #0F5959)',
                border: 'none', borderRadius: '8px', color: '#fff',
                fontSize: '14px', fontWeight: 400, letterSpacing: '0.1em',
                cursor: isLoading ? 'wait' : 'pointer', transition: 'all 0.3s ease',
                marginTop: '8px',
              }}
            >
              {isLoading ? 'Creating account...' : step === 1 ? 'CONTINUE' : 'GET STARTED'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#8A96A6' }}>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')}
              style={{ background: 'none', border: 'none', color: '#30B0D0', cursor: 'pointer', fontSize: '13px' }}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
