import { useNavigate } from 'react-router-dom';
import {
  Briefcase, Users, Inbox, Calendar, Sparkles, TrendingUp, TrendingDown,
  Clock, ChevronRight, Target, Award
} from 'lucide-react';
import { recruiterMetrics, monthlyApplications, applications } from '@/data/mockData';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function RecruiterDashboard() {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Total Jobs', value: recruiterMetrics.totalJobs, icon: Briefcase, change: '+3 this month', trend: 'up' as const, color: '#30B0D0' },
    { label: 'Active Jobs', value: recruiterMetrics.activeJobs, icon: Target, change: '67% active', trend: 'up' as const, color: '#10B981' },
    { label: 'Applications', value: recruiterMetrics.applicationsReceived, icon: Inbox, change: '+24 this week', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Interviews', value: recruiterMetrics.interviewsScheduled, icon: Calendar, change: '8 this week', trend: 'neutral' as const, color: '#F59E0B' },
    { label: 'AI Rankings', value: recruiterMetrics.aiRankingsGenerated, icon: Sparkles, change: 'Auto-generated', trend: 'up' as const, color: '#EC4899' },
    { label: 'Avg Time to Hire', value: `${recruiterMetrics.avgTimeToHire} days`, icon: Clock, change: '-2 days', trend: 'down' as const, color: '#06B6D4' },
  ];

  const recentApps = applications.slice(0, 5);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif', marginBottom: '6px' }}>
          Recruiter Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#8A96A6' }}>Manage your hiring pipeline and track recruitment metrics.</p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{
            background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '18px',
            transition: 'all 0.3s ease', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(48,176,208,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <m.icon size={18} color={m.color} />
              </div>
              {m.trend === 'up' && <TrendingUp size={16} color="#10B981" />}
              {m.trend === 'down' && <TrendingDown size={16} color="#10B981" />}
              {m.trend === 'neutral' && <TrendingUp size={16} color="#8A96A6" />}
            </div>
            <div style={{ fontSize: '22px', fontWeight: 300, color: '#EDE8E4', marginBottom: '4px' }}>{m.value}</div>
            <div style={{ fontSize: '11px', color: '#8A96A6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
        {/* Applications Chart */}
        <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4' }}>Applications Overview</h2>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#30B0D0' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30B0D0' }} /> Applications
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> Hires
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyApplications}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#30B0D0" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#30B0D0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A36" />
              <XAxis dataKey="month" stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} />
              <YAxis stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} />
              <Tooltip
                contentStyle={{ background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', color: '#EDE8E4' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="applications" stroke="#30B0D0" fillOpacity={1} fill="url(#colorApps)" strokeWidth={2} />
              <Area type="monotone" dataKey="hires" stroke="#10B981" fill="none" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: Briefcase, label: 'Post New Job', desc: 'Create a new job listing', action: () => {} },
              { icon: Sparkles, label: 'AI Ranking', desc: 'Rank candidates with AI', action: () => navigate('/dashboard/ranking') },
              { icon: Users, label: 'View Pipeline', desc: 'Manage candidate pipeline', action: () => navigate('/dashboard/pipeline') },
              { icon: Award, label: 'Analytics', desc: 'View detailed reports', action: () => navigate('/dashboard/analytics') },
            ].map((action, i) => (
              <button key={i} onClick={action.action}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px',
                  background: '#111A24', border: '1px solid #1E2A36', borderRadius: '10px',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(48,176,208,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(48,176,208,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <action.icon size={18} color="#30B0D0" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#EDE8E4', marginBottom: '2px' }}>{action.label}</div>
                  <div style={{ fontSize: '11px', color: '#8A96A6' }}>{action.desc}</div>
                </div>
                <ChevronRight size={16} color="#8A96A6" style={{ marginLeft: 'auto' }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4' }}>Recent Applications</h2>
          <button onClick={() => navigate('/dashboard/pipeline')}
            style={{ background: 'none', border: 'none', color: '#30B0D0', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View Pipeline <ChevronRight size={16} />
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E2A36' }}>
                {['Candidate', 'Position', 'Date', 'AI Score', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentApps.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid rgba(30,42,54,0.5)', transition: 'background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(48,176,208,0.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={app.applicantAvatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '13px', color: '#EDE8E4' }}>{app.applicantName}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#8A96A6' }}>{app.jobTitle}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#8A96A6' }}>{app.appliedDate}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 400, color: app.aiScore >= 80 ? '#10B981' : app.aiScore >= 60 ? '#F59E0B' : '#EF4444' }}>
                      {app.aiScore}%
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px', fontSize: '11px',
                      background: app.status === 'selected' ? 'rgba(16,185,129,0.1)' : app.status === 'rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(48,176,208,0.1)',
                      color: app.status === 'selected' ? '#10B981' : app.status === 'rejected' ? '#EF4444' : '#30B0D0',
                    }}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button style={{ padding: '6px 14px', background: 'rgba(48,176,208,0.1)', border: '1px solid rgba(48,176,208,0.2)', borderRadius: '6px', color: '#30B0D0', fontSize: '12px', cursor: 'pointer' }}>
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
