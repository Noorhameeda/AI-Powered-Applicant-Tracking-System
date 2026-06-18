import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, DollarSign, Clock, Building2,
  CheckCircle, Send, Share2, Bookmark, Sparkles
} from 'lucide-react';
import { jobs } from '@/data/mockData';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ fontSize: '20px', color: '#EDE8E4', marginBottom: '12px' }}>Job not found</h2>
        <button onClick={() => navigate('/dashboard/jobs')} style={{ color: '#30B0D0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
          Back to jobs
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/dashboard/jobs')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer', fontSize: '13px', marginBottom: '20px' }}
      >
        <ArrowLeft size={16} /> Back to jobs
      </button>

      {/* Job Header */}
      <div style={{
        background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '16px',
        padding: '32px', marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '14px', flexShrink: 0,
            background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: 600, color: '#fff',
          }}>
            {job.logo}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif' }}>
                {job.title}
              </h1>
              <span style={{
                padding: '4px 12px', borderRadius: '6px', fontSize: '11px',
                background: job.type === 'Remote' ? 'rgba(16,185,129,0.1)' : 'rgba(48,176,208,0.1)',
                color: job.type === 'Remote' ? '#10B981' : '#30B0D0',
                border: `1px solid ${job.type === 'Remote' ? 'rgba(16,185,129,0.2)' : 'rgba(48,176,208,0.2)'}`,
              }}>
                {job.type}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#8A96A6', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Building2 size={14} /> {job.company}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {job.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14} /> {job.salary}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> Posted {job.postedDate}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button style={{
              width: '40px', height: '40px', borderRadius: '10px', background: '#111A24',
              border: '1px solid #1E2A36', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#8A96A6', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#30B0D0'; e.currentTarget.style.color = '#30B0D0'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.color = '#8A96A6'; }}
            >
              <Bookmark size={18} />
            </button>
            <button style={{
              width: '40px', height: '40px', borderRadius: '10px', background: '#111A24',
              border: '1px solid #1E2A36', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#8A96A6', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#30B0D0'; e.currentTarget.style.color = '#30B0D0'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.color = '#8A96A6'; }}
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Skills */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
          {job.skills.map(skill => (
            <span key={skill} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '12px',
              background: 'rgba(48,176,208,0.08)', color: '#30B0D0',
              border: '1px solid rgba(48,176,208,0.15)',
            }}>
              {skill}
            </span>
          ))}
        </div>

        {/* Apply CTA */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button style={{
            padding: '12px 32px', background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
            border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.3s ease', boxShadow: '0 4px 16px rgba(48,176,208,0.2)',
          }}>
            <Send size={16} /> Apply Now
          </button>
          <button style={{
            padding: '12px 24px', background: '#111A24', border: '1px solid #1E2A36',
            borderRadius: '10px', color: '#EDE8E4', fontSize: '14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#30B0D0'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; }}
          >
            <Sparkles size={16} /> AI Match Analysis
          </button>
        </div>
      </div>

      {/* Description and Requirements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        <div>
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px', fontFamily: 'Noto Serif SC, serif' }}>
              About This Role
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#8A96A6' }}>{job.description}</p>
          </div>

          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '16px', padding: '28px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px', fontFamily: 'Noto Serif SC, serif' }}>
              Requirements
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {job.requirements.map((req, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: '#8A96A6', lineHeight: 1.6 }}>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '16px', padding: '24px', position: 'sticky', top: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px' }}>Job Overview</h3>
            {[
              { label: 'Applications', value: `${job.applications} candidates` },
              { label: 'Employment Type', value: job.type },
              { label: 'Location', value: job.location },
              { label: 'Salary Range', value: job.salary },
              { label: 'Posted', value: job.postedDate },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(30,42,54,0.5)' : 'none' }}>
                <span style={{ fontSize: '12px', color: '#8A96A6' }}>{item.label}</span>
                <span style={{ fontSize: '12px', color: '#EDE8E4' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
