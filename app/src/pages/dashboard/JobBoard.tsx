import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, DollarSign, Briefcase, Clock,
  Sparkles, SlidersHorizontal
} from 'lucide-react';
import { jobs } from '@/data/mockData';

const typeFilters = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];

export default function JobBoard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 250]);

  const filtered = jobs.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'All' || j.type === selectedType;
    const matchLocation = !locationFilter || j.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchSearch && matchType && matchLocation;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif', marginBottom: '6px' }}>
          Browse Jobs
        </h1>
        <p style={{ fontSize: '14px', color: '#8A96A6' }}>Find your next opportunity from {jobs.length} open positions</p>
      </div>

      {/* Search and Filters */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '10px',
            background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '10px', padding: '10px 16px',
          }}>
            <Search size={18} color="#8A96A6" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, company, or keywords..."
              style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '14px', width: '100%' }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
              background: showFilters ? 'rgba(48,176,208,0.1)' : '#0B1219',
              border: `1px solid ${showFilters ? '#30B0D0' : '#1E2A36'}`, borderRadius: '10px',
              color: showFilters ? '#30B0D0' : '#8A96A6', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Type tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {typeFilters.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
                background: selectedType === t ? 'rgba(48,176,208,0.1)' : '#0B1219',
                border: `1px solid ${selectedType === t ? '#30B0D0' : '#1E2A36'}`,
                color: selectedType === t ? '#30B0D0' : '#8A96A6',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div style={{
            marginTop: '16px', padding: '20px', background: '#0B1219',
            border: '1px solid #1E2A36', borderRadius: '12px', display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px',
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px' }}>Location</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', padding: '8px 12px' }}>
                <MapPin size={14} color="#8A96A6" />
                <input type="text" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
                  placeholder="Any location" style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '13px', width: '100%' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px' }}>Salary Range (thousands)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#EDE8E4', minWidth: '40px' }}>${salaryRange[0]}k</span>
                <input type="range" min="0" max="250" value={salaryRange[1]}
                  onChange={e => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                  style={{ flex: 1, accentColor: '#30B0D0' }}
                />
                <span style={{ fontSize: '12px', color: '#EDE8E4', minWidth: '40px' }}>${salaryRange[1]}k</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div style={{ marginBottom: '16px', fontSize: '13px', color: '#8A96A6' }}>
        Showing <span style={{ color: '#EDE8E4' }}>{filtered.length}</span> positions
      </div>

      {/* Job Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(job => (
          <div
            key={job.id}
            onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
            style={{
              background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px',
              padding: '20px', cursor: 'pointer', transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(48,176,208,0.3)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.transform = 'translateX(0)'; }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 600, color: '#fff',
            }}>
              {job.logo}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 400, color: '#EDE8E4' }}>{job.title}</h3>
                <span style={{
                  padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
                  background: job.type === 'Remote' ? 'rgba(16,185,129,0.1)' : 'rgba(48,176,208,0.1)',
                  color: job.type === 'Remote' ? '#10B981' : '#30B0D0', border: `1px solid ${job.type === 'Remote' ? 'rgba(16,185,129,0.2)' : 'rgba(48,176,208,0.2)'}`,
                }}>
                  {job.type}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#8A96A6', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Briefcase size={12} /> {job.company}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={12} /> {job.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><DollarSign size={12} /> {job.salary}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={12} /> {job.postedDate}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {job.skills.slice(0, 3).map(s => (
                  <span key={s} style={{ fontSize: '10px', color: '#8A96A6', background: '#111A24', padding: '3px 8px', borderRadius: '4px' }}>
                    {s}
                  </span>
                ))}
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#111A24', border: '1px solid #1E2A36',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={14} color="#30B0D0" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
