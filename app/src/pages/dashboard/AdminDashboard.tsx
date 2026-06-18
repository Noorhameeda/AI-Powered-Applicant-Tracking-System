import { useState } from 'react';
import {
  Shield, Users, Briefcase, Activity, Zap, Server,
  CheckCircle, XCircle, Search,
  TrendingUp, BarChart3
} from 'lucide-react';
import { adminMetrics, usersList, monthlyApplications, skillDistribution } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#30B0D0', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#EF4444', '#84CC16'];

export default function AdminDashboard() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'system'>('overview');

  const filteredUsers = usersList.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const metrics = [
    { label: 'Total Users', value: adminMetrics.totalUsers, icon: Users, color: '#30B0D0', change: '+12% vs last month' },
    { label: 'Active Recruiters', value: adminMetrics.activeRecruiters, icon: Briefcase, color: '#10B981', change: '+5 this week' },
    { label: 'Jobs Posted', value: adminMetrics.totalJobsPosted, icon: Activity, color: '#8B5CF6', change: '342 active' },
    { label: 'AI Analysis', value: adminMetrics.aiAnalysisRun.toLocaleString(), icon: Zap, color: '#F59E0B', change: '1.9K this month' },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <Shield size={24} color="#30B0D0" />
          <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif' }}>
            Admin Dashboard
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: '#8A96A6' }}>Monitor platform health, manage users, and view system analytics.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#0B1219', borderRadius: '10px', padding: '4px', width: 'fit-content', border: '1px solid #1E2A36' }}>
        {[
          { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
          { id: 'users' as const, label: 'Users', icon: Users },
          { id: 'system' as const, label: 'System', icon: Server },
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

      {activeTab === 'overview' && (
        <>
          {/* Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '20px',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(48,176,208,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <m.icon size={20} color={m.color} />
                  </div>
                  <TrendingUp size={16} color="#10B981" />
                </div>
                <div style={{ fontSize: '26px', fontWeight: 300, color: '#EDE8E4', marginBottom: '4px' }}>{m.value}</div>
                <div style={{ fontSize: '12px', color: '#8A96A6' }}>{m.change}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
            <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Platform Activity</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthlyApplications}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2A36" />
                  <XAxis dataKey="month" stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} />
                  <YAxis stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} />
                  <Tooltip contentStyle={{ background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', color: '#EDE8E4' }} />
                  <Bar dataKey="applications" fill="#30B0D0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interviews" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hires" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Top Skills</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={skillDistribution} dataKey="count" nameKey="skill" cx="50%" cy="50%" outerRadius={80}
                    label={({ skill }) => skill} labelLine={false}>
                    {skillDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', color: '#EDE8E4' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '10px',
            padding: '10px 16px', marginBottom: '20px', maxWidth: '400px',
          }}>
            <Search size={16} color="#8A96A6" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '13px', width: '100%' }} />
          </div>

          {/* Users Table */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#111A24', borderBottom: '1px solid #1E2A36' }}>
                    {['User', 'Role', 'Status', 'Last Active', 'Actions'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(30,42,54,0.5)', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(48,176,208,0.03)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={u.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: '13px', color: '#EDE8E4' }}>{u.name}</div>
                            <div style={{ fontSize: '11px', color: '#8A96A6' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '4px 10px', borderRadius: '20px', fontSize: '11px',
                          background: u.role === 'admin' ? 'rgba(239,68,68,0.1)' : u.role === 'recruiter' ? 'rgba(48,176,208,0.1)' : 'rgba(16,185,129,0.1)',
                          color: u.role === 'admin' ? '#EF4444' : u.role === 'recruiter' ? '#30B0D0' : '#10B981',
                          textTransform: 'capitalize',
                        }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: u.status === 'active' ? '#10B981' : '#8A96A6' }}>
                          {u.status === 'active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '12px', color: '#8A96A6' }}>
                        {new Date(u.lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button style={{ padding: '6px 14px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '6px', color: '#8A96A6', fontSize: '12px', cursor: 'pointer' }}>
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'system' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* System Health */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>System Health</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'API Uptime', value: '99.9%', status: 'good' as const },
                { label: 'Database', value: 'Healthy', status: 'good' as const },
                { label: 'AI Engine', value: 'Operational', status: 'good' as const },
                { label: 'Queue Workers', value: '4/4 Active', status: 'good' as const },
                { label: 'Storage', value: '68% Used', status: 'warning' as const },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#8A96A6' }}>{s.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#EDE8E4' }}>{s.value}</span>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: s.status === 'good' ? '#10B981' : '#F59E0B',
                      boxShadow: `0 0 6px ${s.status === 'good' ? '#10B981' : '#F59E0B'}40`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>System Logs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { message: 'AI model retrained successfully', time: '2 min ago', type: 'success' as const },
                { message: 'Database backup completed', time: '15 min ago', type: 'success' as const },
                { message: 'High memory usage on worker-2', time: '1 hr ago', type: 'warning' as const },
                { message: 'New version deployed: v2.4.1', time: '3 hrs ago', type: 'info' as const },
                { message: 'Security patch applied', time: '5 hrs ago', type: 'success' as const },
              ].map((log, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                    background: log.type === 'success' ? '#10B981' : log.type === 'warning' ? '#F59E0B' : '#30B0D0',
                  }} />
                  <span style={{ color: '#EDE8E4', flex: 1 }}>{log.message}</span>
                  <span style={{ color: '#8A96A6', flexShrink: 0 }}>{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Performance Metrics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Avg. Response Time', value: '124ms', change: '-12ms' },
                { label: 'Requests/min', value: '2,450', change: '+180' },
                { label: 'Error Rate', value: '0.02%', change: '-0.01%' },
                { label: 'Active Sessions', value: '342', change: '+28' },
              ].map(p => (
                <div key={p.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#8A96A6', marginBottom: '2px' }}>{p.label}</div>
                    <div style={{ fontSize: '16px', color: '#EDE8E4' }}>{p.value}</div>
                  </div>
                  <span style={{ fontSize: '12px', color: p.change.startsWith('+') ? '#10B981' : '#30B0D0' }}>
                    {p.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
