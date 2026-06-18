import { useNavigate } from 'react-router-dom';
import {
  Send, Calendar, Bookmark, FileCheck, TrendingUp,
  Clock, ChevronRight, Sparkles, MapPin, DollarSign
} from 'lucide-react';
import { applications, jobs, activities } from '@/data/mockData';

const statusColors: Record<string, string> = {
  applied: '#F59E0B',
  shortlisted: '#30B0D0',
  interview: '#8B5CF6',
  selected: '#10B981',
  rejected: '#EF4444',
};

const statusLabels: Record<string, string> = {
  applied: 'Applied', shortlisted: 'Shortlisted', interview: 'Interview',
  selected: 'Selected', rejected: 'Rejected',
};

export default function ApplicantDashboard() {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Applications', value: '12', icon: Send, change: '+3 this week', color: '#30B0D0' },
    { label: 'Interviews', value: '3', icon: Calendar, change: '2 upcoming', color: '#8B5CF6' },
    { label: 'Saved Jobs', value: '8', icon: Bookmark, change: '4 new matches', color: '#F59E0B' },
    { label: 'Resume Score', value: '88', icon: FileCheck, change: 'Top 15%', color: '#10B981' },
  ];

  const recentApps = applications.slice(0, 5);
  const recommendedJobs = jobs.slice(0, 4);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'interview': return Calendar;
      case 'application': return Send;
      case 'status_change': return TrendingUp;
      case 'resume_parse': return FileCheck;
      default: return Sparkles;
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif', marginBottom: '6px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#8A96A6' }}>Welcome back! Here's what's happening with your applications.</p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{
            background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px',
            padding: '20px', transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(48,176,208,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <m.icon size={20} color={m.color} />
              </div>
              <span style={{ fontSize: '11px', color: '#8A96A6', background: '#111A24', padding: '4px 8px', borderRadius: '6px' }}>
                {m.change}
              </span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', marginBottom: '4px' }}>{m.value}</div>
            <div style={{ fontSize: '12px', color: '#8A96A6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Recent Applications Table */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4' }}>Recent Applications</h2>
              <button style={{ background: 'none', border: 'none', color: '#30B0D0', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1E2A36' }}>
                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Role</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Company</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Score</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApps.map(app => (
                    <tr key={app.id} style={{ borderBottom: '1px solid rgba(30,42,54,0.5)', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(48,176,208,0.03)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <td style={{ padding: '12px', fontSize: '13px', color: '#EDE8E4' }}>{app.jobTitle}</td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#8A96A6' }}>{app.company}</td>
                      <td style={{ padding: '12px', fontSize: '13px', color: '#8A96A6', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {app.appliedDate}
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 400,
                          background: `${statusColors[app.status]}15`, color: statusColors[app.status],
                          border: `1px solid ${statusColors[app.status]}30`,
                        }}>
                          {statusLabels[app.status]}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          fontSize: '13px', fontWeight: 400, color: app.aiScore >= 80 ? '#10B981' : app.aiScore >= 60 ? '#F59E0B' : '#EF4444',
                        }}>
                          {app.aiScore}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4' }}>Recommended For You</h2>
              <button onClick={() => navigate('/dashboard/jobs')}
                style={{ background: 'none', border: 'none', color: '#30B0D0', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Browse All <ChevronRight size={16} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {recommendedJobs.map(job => (
                <div key={job.id} style={{
                  background: '#111A24', border: '1px solid #1E2A36', borderRadius: '10px',
                  padding: '16px', cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                  onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(48,176,208,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 600, color: '#fff',
                    }}>
                      {job.logo}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 400, color: '#EDE8E4' }}>{job.title}</div>
                      <div style={{ fontSize: '11px', color: '#8A96A6' }}>{job.company}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                    {job.skills.slice(0, 3).map(skill => (
                      <span key={skill} style={{ fontSize: '10px', color: '#8A96A6', background: '#0B1219', padding: '3px 8px', borderRadius: '4px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#8A96A6' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} /> {job.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><DollarSign size={11} /> {job.salary}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Profile Completion */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#EDE8E4', marginBottom: '12px' }}>Profile Completion</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#1E2A36" strokeWidth="4" />
                <circle cx="28" cy="28" r="24" fill="none" stroke="#30B0D0" strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 24 * 0.75} ${2 * Math.PI * 24}`}
                  strokeDashoffset={0} strokeLinecap="round" transform="rotate(-90 28 28)" />
                <text x="28" y="30" textAnchor="middle" fill="#EDE8E4" fontSize="14" fontWeight="400">75%</text>
              </svg>
              <div>
                <div style={{ fontSize: '13px', color: '#EDE8E4' }}>Almost there!</div>
                <div style={{ fontSize: '12px', color: '#8A96A6' }}>Complete your profile to get better matches</div>
              </div>
            </div>
            {[
              { label: 'Basic Info', done: true },
              { label: 'Resume Upload', done: true },
              { label: 'Work Experience', done: true },
              { label: 'Skills Assessment', done: false },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: item.done ? '#10B981' : '#1E2A36',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {item.done && <FileCheck size={10} color="#fff" />}
                </div>
                <span style={{ fontSize: '12px', color: item.done ? '#8A96A6' : '#EDE8E4' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Activity Timeline */}
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {activities.slice(0, 6).map((activity, i) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} style={{ display: 'flex', gap: '12px', position: 'relative', paddingBottom: '16px' }}>
                    {i < 5 && (
                      <div style={{ position: 'absolute', left: '15px', top: '28px', bottom: 0, width: '1px', background: '#1E2A36' }} />
                    )}
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                      background: '#111A24', border: '1px solid #1E2A36',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={13} color="#30B0D0" />
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#EDE8E4', lineHeight: 1.5, marginBottom: '2px' }}>{activity.description}</p>
                      <span style={{ fontSize: '11px', color: '#8A96A6' }}>
                        {new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
