export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'recruiter' | 'applicant';
  title?: string;
  company?: string;
  location?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  status: 'active' | 'closed' | 'draft';
  applications: number;
  logo: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  applicantAvatar: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'interview' | 'selected' | 'rejected';
  aiScore: number;
  skillMatch: number;
  experienceMatch: number;
  educationMatch: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
  experience: number;
  skills: string[];
  education: string;
  aiScore: number;
  skillMatch: number;
  experienceMatch: number;
  educationMatch: number;
  status: 'applied' | 'shortlisted' | 'interview' | 'selected' | 'rejected';
  resumeScore: number;
  appliedDate: string;
}

export interface Activity {
  id: string;
  type: 'application' | 'interview' | 'status_change' | 'resume_parse' | 'ai_ranking';
  description: string;
  timestamp: string;
  user?: string;
  userAvatar?: string;
}

export interface ResumeData {
  skills: string[];
  experience: {
    company: string;
    title: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
  summary: string;
  aiAnalysis: {
    strengths: string[];
    weaknesses: string[];
    missingSkills: string[];
    overallScore: number;
  };
}

export interface DashboardMetric {
  label: string;
  value: number | string;
  change?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}
