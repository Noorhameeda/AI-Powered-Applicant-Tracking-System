import { useState } from 'react';
import {
  Upload, FileText, CheckCircle, AlertTriangle,
  Star, TrendingUp, Zap, Brain, ChevronRight, Award, X
} from 'lucide-react';
import { resumeData } from '@/data/mockData';

export default function ResumeAnalysis() {
  const [uploaded, setUploaded] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload();
  };

  if (!uploaded) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #30B0D0, #0F5959)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <FileText size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif', marginBottom: '8px' }}>
            Resume AI Analysis
          </h1>
          <p style={{ fontSize: '14px', color: '#8A96A6' }}>Upload your resume for AI-powered analysis and scoring</p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUpload}
          style={{
            border: `2px dashed ${dragOver ? '#30B0D0' : '#1E2A36'}`,
            borderRadius: '16px', padding: '60px 40px',
            background: dragOver ? 'rgba(48,176,208,0.05)' : '#0B1219',
            cursor: 'pointer', transition: 'all 0.3s ease',
          }}
        >
          <Upload size={40} color={dragOver ? '#30B0D0' : '#8A96A6'} style={{ margin: '0 auto 16px', display: 'block' }} />
          <p style={{ fontSize: '16px', color: '#EDE8E4', marginBottom: '8px' }}>
            {uploading ? 'Analyzing resume...' : 'Drag & drop your resume here'}
          </p>
          <p style={{ fontSize: '13px', color: '#8A96A6', marginBottom: '20px' }}>
            or click to browse (PDF, DOC, DOCX up to 10MB)
          </p>
          {uploading && (
            <div style={{ width: '200px', height: '4px', background: '#1E2A36', borderRadius: '2px', margin: '0 auto', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg, #30B0D0, #0F5959)', borderRadius: '2px', animation: 'progress 2s ease infinite' }} />
              <style>{`@keyframes progress { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }`}</style>
            </div>
          )}
        </div>
      </div>
    );
  }

  const analysis = resumeData.aiAnalysis;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <Brain size={24} color="#30B0D0" />
          <h1 style={{ fontSize: '28px', fontWeight: 300, color: '#EDE8E4', fontFamily: 'Noto Serif SC, serif' }}>
            AI Resume Analysis
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: '#8A96A6' }}>Comprehensive AI-powered resume breakdown and scoring.</p>
      </div>

      {/* Top Row - Score + Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Overall Score */}
        <div style={{
          background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px',
          padding: '28px', textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#8A96A6', marginBottom: '20px' }}>Overall Score</h3>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ margin: '0 auto 16px' }}>
            <circle cx="70" cy="70" r="60" fill="none" stroke="#1E2A36" strokeWidth="8" />
            <circle cx="70" cy="70" r="60" fill="none"
              stroke={analysis.overallScore >= 80 ? '#10B981' : '#30B0D0'}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 60 * analysis.overallScore / 100} ${2 * Math.PI * 60}`}
              strokeDashoffset={0}
              transform="rotate(-90 70 70)"
              style={{ filter: `drop-shadow(0 0 8px ${analysis.overallScore >= 80 ? '#10B981' : '#30B0D0'}40)` }}
            />
            <text x="70" y="65" textAnchor="middle" fill="#EDE8E4" fontSize="32" fontWeight={300}>
              {analysis.overallScore}
            </text>
            <text x="70" y="82" textAnchor="middle" fill="#8A96A6" fontSize="11">
              OUT OF 100
            </text>
          </svg>
          <div style={{
            padding: '6px 14px', borderRadius: '20px', fontSize: '12px', display: 'inline-block',
            background: analysis.overallScore >= 80 ? 'rgba(16,185,129,0.1)' : 'rgba(48,176,208,0.1)',
            color: analysis.overallScore >= 80 ? '#10B981' : '#30B0D0',
            border: `1px solid ${analysis.overallScore >= 80 ? 'rgba(16,185,129,0.2)' : 'rgba(48,176,208,0.2)'}`,
          }}>
            {analysis.overallScore >= 90 ? 'Exceptional' : analysis.overallScore >= 80 ? 'Strong' : analysis.overallScore >= 60 ? 'Good' : 'Needs Work'}
          </div>
        </div>

        {/* Resume Summary */}
        <div style={{
          background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px',
          padding: '28px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '12px', fontFamily: 'Noto Serif SC, serif' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#8A96A6', marginBottom: '20px' }}>
            {resumeData.summary}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { label: 'Skills', value: resumeData.skills.length, icon: Zap },
              { label: 'Experience', value: `${resumeData.experience.length} roles`, icon: TrendingUp },
              { label: 'Education', value: resumeData.education.length, icon: Award },
              { label: 'Projects', value: resumeData.projects.length, icon: Star },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '12px', background: '#111A24', borderRadius: '8px' }}>
                <s.icon size={18} color="#30B0D0" style={{ margin: '0 auto 6px', display: 'block' }} />
                <div style={{ fontSize: '18px', color: '#EDE8E4', marginBottom: '2px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#8A96A6' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div style={{
        background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px',
        padding: '24px', marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px', fontFamily: 'Noto Serif SC, serif' }}>
          Extracted Skills
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {resumeData.skills.map(skill => (
            <span key={skill} style={{
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
              background: 'rgba(48,176,208,0.08)', color: '#30B0D0',
              border: '1px solid rgba(48,176,208,0.15)',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={{
        background: '#0B1219', border: '1px solid #1E2A36', borderRadius: '12px',
        padding: '24px', marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#EDE8E4', marginBottom: '16px', fontFamily: 'Noto Serif SC, serif' }}>
          Work Experience
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {resumeData.experience.map((exp, i) => (
            <div key={i} style={{
              padding: '16px', background: '#111A24', borderRadius: '10px',
              border: '1px solid #1E2A36',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px', color: '#EDE8E4' }}>{exp.title}</span>
                <span style={{ fontSize: '11px', color: '#8A96A6' }}>{exp.duration}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#30B0D0', marginBottom: '6px' }}>{exp.company}</div>
              <p style={{ fontSize: '12px', color: '#8A96A6', lineHeight: 1.5 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis - Strengths / Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Strengths */}
        <div style={{
          background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px', padding: '24px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#10B981', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} /> Key Strengths
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analysis.strengths.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ChevronRight size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '13px', color: '#8A96A6', lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div style={{
          background: 'rgba(245,158,11,0.03)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px', padding: '24px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#F59E0B', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} /> Areas for Improvement
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analysis.weaknesses.map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ChevronRight size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '13px', color: '#8A96A6', lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missing Skills */}
      <div style={{
        background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: '12px', padding: '24px',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#EF4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <X size={18} /> Missing Skills for Target Role
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {analysis.missingSkills.map(skill => (
            <span key={skill} style={{
              padding: '6px 14px', borderRadius: '6px', fontSize: '12px',
              background: 'rgba(239,68,68,0.08)', color: '#EF4444',
              border: '1px solid rgba(239,68,68,0.15)',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
