import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard, Briefcase, Users, BarChart3, GitBranch,
  FileText, Settings, Bell, Search, ChevronDown, LogOut,
  Shield, Sparkles, Menu, TrendingUp
} from 'lucide-react';
import { currentUser, notifications as mockNotifications } from '@/data/mockData';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'Jobs', path: '/dashboard/jobs' },
  { icon: Sparkles, label: 'AI Ranking', path: '/dashboard/ranking' },
  { icon: GitBranch, label: 'Pipeline', path: '/dashboard/pipeline' },
  { icon: FileText, label: 'Resume AI', path: '/dashboard/resume' },
  { icon: TrendingUp, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: BarChart3, label: 'Recruiter', path: '/dashboard/recruiter' },
  { icon: Shield, label: 'Admin', path: '/dashboard/admin' },
  { icon: Settings, label: 'Settings', path: '/dashboard/profile' },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications] = useState(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050A0F' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 40, backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: '#0B1219',
          borderRight: '1px solid #1E2A36',
          display: 'flex',
          flexDirection: 'column',
          position: sidebarOpen ? 'fixed' : 'relative',
          left: sidebarOpen ? 0 : undefined,
          zIndex: 50,
          height: '100vh',
          transition: 'transform 0.3s ease',
          transform: sidebarOpen || window.innerWidth > 1024 ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Brand */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1E2A36', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 400, color: '#EDE8E4', letterSpacing: '0.1em', fontFamily: 'Noto Serif SC, serif' }}>
            ObsidianHire
          </span>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 14px', borderRadius: '8px',
                  border: 'none', cursor: 'pointer', width: '100%',
                  background: isActive ? 'rgba(48, 176, 208, 0.1)' : 'transparent',
                  color: isActive ? '#30B0D0' : '#8A96A6',
                  transition: 'all 0.2s ease',
                  fontSize: '13px', fontWeight: 400, letterSpacing: '0.02em',
                  borderLeft: isActive ? '2px solid #30B0D0' : '2px solid transparent',
                }}
                onMouseEnter={e => {
                  if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#EDE8E4'; }
                }}
                onMouseLeave={e => {
                  if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A96A6'; }
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #1E2A36' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px' }}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1E2A36' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 400, color: '#EDE8E4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '11px', color: '#8A96A6' }}>{currentUser.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{
          height: '64px', background: '#0B1219', borderBottom: '1px solid #1E2A36',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer', display: 'flex', padding: '4px' }}
            >
              <Menu size={22} />
            </button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#111A24', borderRadius: '8px', padding: '8px 14px',
              border: '1px solid #1E2A36', width: '320px',
            }}>
              <Search size={16} color="#8A96A6" />
              <input
                type="text"
                placeholder="Search candidates, jobs..."
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: '#EDE8E4', fontSize: '13px', width: '100%',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Notifications */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                style={{ background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer', position: 'relative', padding: '8px' }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '4px', right: '4px',
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: '#EF4444', color: '#fff', fontSize: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '48px', width: '360px',
                  background: '#111A24', border: '1px solid #1E2A36',
                  borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  zIndex: 100, overflow: 'hidden',
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #1E2A36', fontSize: '14px', fontWeight: 400, color: '#EDE8E4' }}>
                    Notifications
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '12px 16px', borderBottom: '1px solid rgba(30,42,54,0.5)',
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      background: n.read ? 'transparent' : 'rgba(48,176,208,0.05)',
                    }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', flexShrink: 0,
                        background: n.type === 'success' ? '#10B981' : n.type === 'error' ? '#EF4444' : '#30B0D0',
                      }} />
                      <div>
                        <div style={{ fontSize: '13px', color: '#EDE8E4', marginBottom: '2px' }}>{n.title}</div>
                        <div style={{ fontSize: '12px', color: '#8A96A6' }}>{n.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={currentUser.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <ChevronDown size={16} color="#8A96A6" />
              </button>
              {profileOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '48px', width: '200px',
                  background: '#111A24', border: '1px solid #1E2A36',
                  borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  zIndex: 100, overflow: 'hidden',
                }}>
                  <button onClick={() => { navigate('/dashboard/profile'); setProfileOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', width: '100%', background: 'none', border: 'none', color: '#EDE8E4', fontSize: '13px', cursor: 'pointer', borderBottom: '1px solid #1E2A36' }}>
                    <Users size={16} /> Profile
                  </button>
                  <button onClick={() => { navigate('/'); setProfileOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', width: '100%', background: 'none', border: 'none', color: '#EF4444', fontSize: '13px', cursor: 'pointer' }}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
