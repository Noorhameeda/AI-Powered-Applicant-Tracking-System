import { useState } from 'react';
import {
  GitBranch, Plus, MoreHorizontal, Clock, Sparkles
} from 'lucide-react';
import { candidates } from '@/data/mockData';
import type { Candidate } from '@/types';

const columns = [
  { id: 'applied', label: 'Applied', color: '#F59E0B' },
  { id: 'shortlisted', label: 'Shortlisted', color: '#30B0D0' },
  { id: 'interview', label: 'Interview', color: '#8B5CF6' },
  { id: 'selected', label: 'Selected', color: '#10B981' },
  { id: 'rejected', label: 'Rejected', color: '#EF4444' },
];

export default function Pipeline() {
  const [pipelineCandidates, setPipelineCandidates] = useState<Candidate[]>(candidates);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const getColumnCandidates = (status: string) =>
    pipelineCandidates.filter(c => c.status === status);

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    setDraggingId(candidateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (!draggingId) return;
    setPipelineCandidates(prev =>
      prev.map(c => c.id === draggingId ? { ...c, status: columnId as Candidate['status'] } : c)
    );
    setDraggingId(null);
    setDragOverColumn(null);
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <GitBranch size={24} color="#30B0D0" />
            <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif' }}>
              Application Pipeline
            </h1>
          </div>
          <p style={{ fontSize: '14px', color: '#8A96A6' }}>Drag candidates between stages to update their status.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
            background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '10px',
            color: '#8A96A6', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#30B0D0'; e.currentTarget.style.color = '#30B0D0'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E2A36'; e.currentTarget.style.color = '#8A96A6'; }}
          >
            <Sparkles size={16} /> AI Suggest
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
            background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
            border: 'none', borderRadius: '10px', color: '#fff',
            fontSize: '13px', cursor: 'pointer',
          }}>
            <Plus size={16} /> Add Candidate
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '8px',
      }}>
        {columns.map(col => {
          const colCandidates = getColumnCandidates(col.id);
          const isDragOver = dragOverColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={e => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, col.id)}
              style={{
                background: isDragOver ? `${col.color}08` : '#0B1219',
                border: `1px solid ${isDragOver ? col.color : '#1E2A36'}`,
                borderRadius: '12px', minWidth: '260px',
                transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column',
                maxHeight: 'calc(100vh - 200px)',
              }}
            >
              {/* Column Header */}
              <div style={{
                padding: '16px', borderBottom: '1px solid #1E2A36',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%', background: col.color,
                    boxShadow: `0 0 8px ${col.color}40`,
                  }} />
                  <span style={{ fontSize: '13px', fontWeight: 400, color: '#EDE8E4' }}>{col.label}</span>
                </div>
                <span style={{
                  padding: '2px 8px', borderRadius: '10px', fontSize: '11px',
                  background: `${col.color}15`, color: col.color,
                }}>
                  {colCandidates.length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }}>
                {colCandidates.map(candidate => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={e => handleDragStart(e, candidate.id)}
                    style={{
                      background: draggingId === candidate.id ? '#111A24' : '#111A24',
                      border: `1px solid ${draggingId === candidate.id ? '#30B0D0' : '#1E2A36'}`,
                      borderRadius: '10px', padding: '14px', cursor: 'grab',
                      transition: 'all 0.3s ease', opacity: draggingId === candidate.id ? 0.7 : 1,
                      transform: draggingId === candidate.id ? 'scale(1.02) rotate(1deg)' : 'none',
                      boxShadow: draggingId === candidate.id ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <img src={candidate.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', color: '#EDE8E4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {candidate.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8A96A6' }}>{candidate.title}</div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: '#8A96A6', cursor: 'pointer', padding: '2px' }}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {candidate.skills.slice(0, 3).map(s => (
                        <span key={s} style={{ fontSize: '9px', color: '#8A96A6', background: '#0B1219', padding: '2px 6px', borderRadius: '3px' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={10} color="#30B0D0" />
                        <span style={{ fontSize: '11px', color: '#30B0D0' }}>{candidate.aiScore}%</span>
                      </div>
                      <span style={{ fontSize: '10px', color: '#8A96A6', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Clock size={10} /> {candidate.appliedDate}
                      </span>
                    </div>
                  </div>
                ))}

                {colCandidates.length === 0 && (
                  <div style={{
                    padding: '24px', textAlign: 'center', border: '1px dashed #1E2A36',
                    borderRadius: '8px', color: '#8A96A6', fontSize: '12px',
                  }}>
                    No candidates yet
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
