import { useState } from 'react';
import {
  Sparkles, Filter, Search, MapPin, ChevronRight,
  Star, Award, TrendingUp, X, Calendar, Mail, Download
} from 'lucide-react';
import { candidates } from '@/data/mockData';
import type { Candidate } from '@/types';

type SortKey = 'aiScore' | 'skillMatch' | 'experience';

function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = score >= 85 ? '#10B981' : score >= 70 ? '#30B0D0' : score >= 50 ? '#F59E0B' : '#EF4444';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1E2A36" strokeWidth="3" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill="#EDE8E4" fontSize={size > 40 ? 13 : 11} fontWeight={400}>
        {score}
      </text>
    </svg>
  );
}

export default function CandidateRanking() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('aiScore');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = candidates
    .filter(c => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchLocation = !locationFilter || c.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchSearch && matchLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'aiScore') return b.aiScore - a.aiScore;
      if (sortBy === 'skillMatch') return b.skillMatch - a.skillMatch;
      return b.experienceMatch - a.experienceMatch;
    });

  const locations = [...new Set(candidates.map(c => c.location))];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <Sparkles size={24} color="#30B0D0" />
          <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif' }}>
            AI Candidate Ranking
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: '#8A96A6' }}>Ranked by skill alignment, experience match, and education relevance.</p>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{
          flex: 1, minWidth: '260px', display: 'flex', alignItems: 'center', gap: '10px',
          background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '10px', padding: '10px 16px',
        }}>
          <Search size={16} color="#8A96A6" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search candidates or skills..."
            style={{ background: 'none', border: 'none', outline: 'none', color: '#EDE8E4', fontSize: '13px', width: '100%' }} />
        </div>

        <button onClick={() => setShowFilters(!showFilters)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
            background: showFilters ? 'rgba(48,176,208,0.1)' : '#0B1219',
            border: `1px solid ${showFilters ? '#30B0D0' : '#1E2A36'}`, borderRadius: '10px',
            color: showFilters ? '#30B0D0' : '#8A96A6', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
          <Filter size={16} /> Filters
        </button>

        <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}
          style={{ padding: '10px 16px', background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '10px', color: '#EDE8E4', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
          <option value="aiScore">AI Score</option>
          <option value="skillMatch">Skill Match</option>
          <option value="experience">Experience</option>
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

      {/* Expandable Filters */}
      {showFilters && (
        <div style={{
          background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px',
          padding: '20px', marginBottom: '24px', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px',
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px' }}>Location</label>
            <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '8px', color: '#EDE8E4', fontSize: '13px', outline: 'none' }}>
              <option value="">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px' }}>Experience (years)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="range" min="0" max="15" style={{ flex: 1, accentColor: '#30B0D0' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#8A96A6', marginBottom: '6px' }}>AI Score Range</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '6px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '6px', color: '#10B981', fontSize: '12px', cursor: 'pointer' }}>80-100</button>
              <button style={{ padding: '6px 12px', background: 'rgba(48,176,208,0.1)', border: '1px solid rgba(48,176,208,0.2)', borderRadius: '6px', color: '#30B0D0', fontSize: '12px', cursor: 'pointer' }}>60-79</button>
              <button style={{ padding: '6px 12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '6px', color: '#F59E0B', fontSize: '12px', cursor: 'pointer' }}>Below 60</button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div style={{ fontSize: '13px', color: '#8A96A6', marginBottom: '16px' }}>
        Showing <span style={{ color: '#EDE8E4' }}>{filtered.length}</span> candidates ranked by AI
      </div>

      {/* Table */}
      <div style={{ background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#111A24', borderBottom: '1px solid #1E2A36' }}>
                {['Rank', 'Candidate', 'AI Score', 'Skill Match', 'Experience', 'Education', 'Status', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontSize: '11px', color: '#8A96A6', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => (
                <tr key={c.id}
                  style={{ borderBottom: '1px solid rgba(30,42,54,0.5)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                  onClick={() => setSelectedCandidate(c)}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(48,176,208,0.03)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <td style={{ padding: '14px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: idx === 0 ? 'rgba(245,158,11,0.15)' : idx === 1 ? 'rgba(192,192,192,0.1)' : idx === 2 ? 'rgba(205,127,50,0.1)' : '#111A24',
                      border: `1px solid ${idx === 0 ? 'rgba(245,158,11,0.3)' : idx === 1 ? 'rgba(192,192,192,0.2)' : idx === 2 ? 'rgba(205,127,50,0.2)' : '#1E2A36'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', color: idx < 3 ? '#EDE8E4' : '#8A96A6',
                    }}>
                      {idx + 1}
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={c.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1E2A36' }} />
                      <div>
                        <div style={{ fontSize: '13px', color: '#EDE8E4', marginBottom: '2px' }}>{c.name}</div>
                        <div style={{ fontSize: '11px', color: '#8A96A6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={10} /> {c.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}><ScoreRing score={c.aiScore} /></td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '60px', height: '4px', background: '#1E2A36', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${c.skillMatch}%`, height: '100%', background: '#30B0D0', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#EDE8E4' }}>{c.skillMatch}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '60px', height: '4px', background: '#1E2A36', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${c.experienceMatch}%`, height: '100%', background: '#8B5CF6', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#EDE8E4' }}>{c.experienceMatch}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '60px', height: '4px', background: '#1E2A36', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${c.educationMatch}%`, height: '100%', background: '#10B981', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#EDE8E4' }}>{c.educationMatch}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px', fontSize: '11px',
                      background: c.status === 'selected' ? 'rgba(16,185,129,0.1)' : c.status === 'rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(48,176,208,0.1)',
                      color: c.status === 'selected' ? '#10B981' : c.status === 'rejected' ? '#EF4444' : '#30B0D0',
                    }}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <ChevronRight size={16} color="#8A96A6" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Detail Drawer */}
      {selectedCandidate && (
        <div style={{
          position: 'fixed', top: 0, right: 0, width: '460px', maxWidth: '100vw',
          height: '100vh', background: '#0B1219', borderLeft: '1px solid #1E2A36',
          zIndex: 200, overflow: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.4)',
          animation: 'slideIn 0.3s ease',
        }}>
          <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

          {/* Drawer Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid #1E2A36', position: 'sticky', top: 0, background: '#0B1219', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <button onClick={() => setSelectedCandidate(null)}
                style={{ background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                <X size={18} /> Close
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ padding: '6px 12px', background: '#111A24', border: '1px solid #1E2A36', borderRadius: '6px', color: '#EDE8E4', fontSize: '12px', cursor: 'pointer' }}>
                  <Mail size={14} style={{ display: 'inline', marginRight: '4px' }} />Email
                </button>
                <button style={{ padding: '6px 12px', background: 'rgba(48,176,208,0.1)', border: '1px solid rgba(48,176,208,0.2)', borderRadius: '6px', color: '#30B0D0', fontSize: '12px', cursor: 'pointer' }}>
                  <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />Interview
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={selectedCandidate.avatar} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #30B0D0' }} />
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif', marginBottom: '4px' }}>
                  {selectedCandidate.name}
                </h2>
                <p style={{ fontSize: '13px', color: '#8A96A6', marginBottom: '4px' }}>{selectedCandidate.title}</p>
                <p style={{ fontSize: '12px', color: '#8A96A6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> {selectedCandidate.location} • {selectedCandidate.experience} years exp
                </p>
              </div>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {/* AI Scores */}
            <div style={{ background: '#111A24', border: '1px solid #1E2A36', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#30B0D0" /> AI Analysis
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'Overall', value: selectedCandidate.aiScore, color: '#30B0D0' },
                  { label: 'Skills', value: selectedCandidate.skillMatch, color: '#8B5CF6' },
                  { label: 'Experience', value: selectedCandidate.experienceMatch, color: '#10B981' },
                  { label: 'Education', value: selectedCandidate.educationMatch, color: '#F59E0B' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <ScoreRing score={s.value} size={56} />
                    <div style={{ fontSize: '11px', color: '#8A96A6', marginTop: '6px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#EDE8E4', marginBottom: '12px' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedCandidate.skills.map(skill => (
                  <span key={skill} style={{
                    padding: '5px 12px', borderRadius: '6px', fontSize: '12px',
                    background: 'rgba(48,176,208,0.08)', color: '#30B0D0',
                    border: '1px solid rgba(48,176,208,0.15)',
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#EDE8E4', marginBottom: '8px' }}>Education</h3>
              <p style={{ fontSize: '13px', color: '#8A96A6' }}>{selectedCandidate.education}</p>
            </div>

            {/* AI Insights */}
            <div style={{ background: 'rgba(48,176,208,0.05)', border: '1px solid rgba(48,176,208,0.15)', borderRadius: '10px', padding: '16px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 400, color: '#30B0D0', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={14} /> AI Insights
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <TrendingUp size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '12px', color: '#8A96A6' }}>Strong technical background with relevant industry experience</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Star size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '12px', color: '#8A96A6' }}>Top {100 - selectedCandidate.aiScore}% percentile for this role</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
