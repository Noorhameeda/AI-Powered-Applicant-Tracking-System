import { useState } from 'react';
import {
  User, Mail, Building2, MapPin, Briefcase, Shield,
  Bell, Lock, Eye, EyeOff, Save, Camera
} from 'lucide-react';
import { currentUser } from '@/data/mockData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    title: currentUser.title || '',
    company: currentUser.company || '',
    location: currentUser.location || '',
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif', marginBottom: '6px' }}>
          Profile Settings
        </h1>
        <p style={{ fontSize: '14px', color: '#8A96A6' }}>Manage your account settings and preferences.</p>
      </div>

      {/* Profile Card */}
      <div style={{
        background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '16px',
        padding: '32px', marginBottom: '24px', textAlign: 'center',
      }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #30B0D0' }}
          />
          <button style={{
            position: 'absolute', bottom: '4px', right: '4px',
            width: '30px', height: '30px', borderRadius: '50%',
            background: '#30B0D0', border: '2px solid #0B1219',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <Camera size={14} color="#fff" />
          </button>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: 300, color: '#EDE8E4', marginBottom: '4px', fontFamily: 'Noto Serif SC, serif' }}>
          {currentUser.name}
        </h2>
        <p style={{ fontSize: '14px', color: '#8A96A6', marginBottom: '8px' }}>{currentUser.title}</p>
        <span style={{
          padding: '4px 12px', borderRadius: '20px', fontSize: '11px',
          background: 'rgba(48,176,208,0.1)', color: '#30B0D0',
          border: '1px solid rgba(48,176,208,0.2)', textTransform: 'capitalize',
        }}>
          {currentUser.role}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#0B1219', borderRadius: '10px', padding: '4px', width: 'fit-content', border: '1px solid #1E2A36' }}>
        {[
          { id: 'profile' as const, label: 'Profile', icon: User },
          { id: 'security' as const, label: 'Security', icon: Lock },
          { id: 'notifications' as const, label: 'Notifications', icon: Bell },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px',
              background: activeTab === tab.id ? 'rgba(48,176,208,0.1)' : 'transparent',
              border: `1px solid ${activeTab === tab.id ? 'rgba(48,176,208,0.3)' : 'transparent'}`,
              borderRadius: '8px', color: activeTab === tab.id ? '#30B0D0' : '#8A96A6',
              fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '28px' }}>
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Full Name
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '10px 14px' }}>
                  <User size={16} color="#8A96A6" />
                  <input type="text" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Email
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '10px 14px' }}>
                  <Mail size={16} color="#8A96A6" />
                  <input type="email" value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Job Title
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '10px 14px' }}>
                  <Briefcase size={16} color="#8A96A6" />
                  <input type="text" value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Company
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '10px 14px' }}>
                  <Building2 size={16} color="#8A96A6" />
                  <input type="text" value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }} />
                </div>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Location
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '10px 14px' }}>
                <MapPin size={16} color="#8A96A6" />
                <input type="text" value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Current Password
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '10px 14px' }}>
                <Lock size={16} color="#8A96A6" />
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter current password"
                  style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }} />
                <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                New Password
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '10px 14px' }}>
                <Lock size={16} color="#8A96A6" />
                <input type="password" placeholder="Min 8 characters"
                  style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Two-Factor Authentication
              </label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Shield size={18} color="#10B981" />
                  <div>
                    <div style={{ fontSize: '13px', color: '#EDE8E4' }}>Authenticator App</div>
                    <div style={{ fontSize: '11px', color: '#8A96A6' }}>Enabled via Google Authenticator</div>
                  </div>
                </div>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'New Applications', desc: 'Get notified when a candidate applies', enabled: true },
              { label: 'Interview Reminders', desc: 'Receive reminders before scheduled interviews', enabled: true },
              { label: 'AI Rankings Complete', desc: 'Notification when AI batch ranking finishes', enabled: true },
              { label: 'Status Changes', desc: 'When candidates move pipeline stages', enabled: false },
              { label: 'Weekly Summary', desc: 'Digest of weekly hiring activity', enabled: true },
              { label: 'Marketing Emails', desc: 'Product updates and tips', enabled: false },
            ].map((n, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px',
              }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#EDE8E4', marginBottom: '2px' }}>{n.label}</div>
                  <div style={{ fontSize: '11px', color: '#8A96A6' }}>{n.desc}</div>
                </div>
                <button style={{
                  width: '40px', height: '22px', borderRadius: '11px',
                  background: n.enabled ? '#30B0D0' : '#1E2A36',
                  border: 'none', cursor: 'pointer', position: 'relative',
                  transition: 'background 0.3s ease',
                }}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: '#fff', position: 'absolute',
                    top: '3px', left: n.enabled ? '20px' : '4px',
                    transition: 'left 0.3s ease',
                  }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Save Button */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1E2A36', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
              background: saving ? 'rgba(48,176,208,0.5)' : 'linear-gradient(135deg, #30B0D0, #0F5959)',
              border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px',
              cursor: saving ? 'wait' : 'pointer', transition: 'all 0.3s ease',
            }}
          >
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
