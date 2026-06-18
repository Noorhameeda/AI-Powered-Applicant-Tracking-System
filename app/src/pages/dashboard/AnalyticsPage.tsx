import { useState } from 'react';
import {
  TrendingUp, Users, Clock, Target, Zap, BarChart3,
  Download
} from 'lucide-react';
import {
  monthlyApplications, skillDistribution
} from '@/data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#30B0D0', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#EF4444', '#84CC16'];

const hiringFunnel = [
  { stage: 'Applied', count: 156 },
  { stage: 'Shortlisted', count: 48 },
  { stage: 'Interview', count: 24 },
  { stage: 'Offer', count: 12 },
  { stage: 'Hired', count: 9 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <BarChart3 size={24} color="#30B0D0" />
            <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif' }}>
              Analytics Dashboard
            </h1>
          </div>
          <p style={{ fontSize: '14px', color: '#8A96A6' }}>Deep insights into your hiring performance and candidate pipeline.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            style={{ padding: '10px 16px', background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '10px', color: '#EDE8E4', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
            background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '10px',
            color: '#8A96A6', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#30B0D0'; e.currentTarget.style.color = '#30B0D0'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.color = '#8A96A6'; }}
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Time to Hire', value: '18 days', change: '-3 days', icon: Clock, color: '#30B0D0' },
          { label: 'Offer Acceptance', value: '78%', change: '+5%', icon: Target, color: '#10B981' },
          { label: 'Source Quality', value: 'LinkedIn', change: '42% of hires', icon: Users, color: '#8B5CF6' },
          { label: 'AI Efficiency', value: '94%', change: '+2%', icon: Zap, color: '#F59E0B' },
          { label: 'Cost per Hire', value: '$3,200', change: '-$400', icon: TrendingUp, color: '#06B6D4' },
          { label: 'Pipeline Speed', value: '12 days', change: '-2 days', icon: BarChart3, color: '#EC4899' },
        ].map((m, i) => (
          <div key={i} style={{
            background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '18px',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(48,176,208,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <m.icon size={18} color={m.color} />
              </div>
              <span style={{ fontSize: '11px', color: m.change.startsWith('+') || m.change.startsWith('-$') ? '#10B981' : '#EF4444' }}>
                {m.change}
              </span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 300, color: '#EDE8E4', marginBottom: '4px' }}>{m.value}</div>
            <div style={{ fontSize: '11px', color: '#8A96A6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Applications Trend */}
        <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4' }}>Applications Trend</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#30B0D0' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30B0D0' }} /> Applications
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> Hires
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyApplications}>
              <defs>
                <linearGradient id="colorApps2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#30B0D0" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#30B0D0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHires2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A36" />
              <XAxis dataKey="month" stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} />
              <YAxis stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} />
              <Tooltip contentStyle={{ background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', color: '#EDE8E4' }} />
              <Area type="monotone" dataKey="applications" stroke="#30B0D0" fill="url(#colorApps2)" strokeWidth={2} />
              <Area type="monotone" dataKey="hires" stroke="#10B981" fill="url(#colorHires2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring Funnel */}
        <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Hiring Funnel</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hiringFunnel.map((stage, i) => {
              const maxCount = hiringFunnel[0].count;
              const percentage = (stage.count / maxCount) * 100;
              return (
                <div key={stage.stage}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#8A96A6' }}>{stage.stage}</span>
                    <span style={{ fontSize: '12px', color: '#EDE8E4' }}>{stage.count}</span>
                  </div>
                  <div style={{ width: '100%', height: '28px', background: '#111A24', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      width: `${percentage}%`, height: '100%',
                      background: `linear-gradient(90deg, ${COLORS[i % COLORS.length]}80, ${COLORS[i % COLORS.length]})`,
                      borderRadius: '6px', transition: 'width 0.5s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px',
                    }}>
                      <span style={{ fontSize: '11px', color: '#fff', fontWeight: 400 }}>{Math.round(percentage)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Skills Distribution */}
        <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Top Skills in Pipeline</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={skillDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A36" />
              <XAxis type="number" stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} />
              <YAxis dataKey="skill" type="category" stroke="#8A96A6" tick={{ fontSize: 12 }} axisLine={{ stroke: '#1E2A36' }} width={80} />
              <Tooltip contentStyle={{ background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', color: '#EDE8E4' }} />
              <Bar dataKey="count" fill="#30B0D0" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Score Distribution */}
        <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>AI Score Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={[
                { name: '90-100', value: 12 },
                { name: '80-89', value: 28 },
                { name: '70-79', value: 35 },
                { name: '60-69', value: 22 },
                { name: 'Below 60', value: 18 },
              ]} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {[
                  { fill: '#10B981' },
                  { fill: '#30B0D0' },
                  { fill: '#8B5CF6' },
                  { fill: '#F59E0B' },
                  { fill: '#EF4444' },
                ].map((c, i) => (
                  <Cell key={i} fill={c.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', color: '#EDE8E4' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: '90-100', color: '#10B981' },
              { label: '80-89', color: '#30B0D0' },
              { label: '70-79', color: '#8B5CF6' },
              { label: '60-69', color: '#F59E0B' },
              { label: 'Below 60', color: '#EF4444' },
            ].map(item => (
              <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#8A96A6' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
