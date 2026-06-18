export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavLink {
  label: string
  targetId: string
}

export interface NavigationConfig {
  brandMark: string
  links: NavLink[]
}

export interface HeroConfig {
  wordmarkText: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  descriptionLine1: string
  descriptionLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface PhilosophyConfig {
  eyebrow: string
  title: string
  body: string
  rollingWords: string[]
}

export interface ProjectMeta {
  label: string
  value: string
}

export interface ProjectData {
  id: string
  title: string
  location: string
  year: string
  image: string
  subtitle: string
  meta: ProjectMeta[]
  paragraphs: string[]
}

export interface GalleryConfig {
  sectionLabel: string
  title: string
  projects: ProjectData[]
}

export interface MediumItem {
  cn: string
  en: string
  description: string
}

export interface MediumsConfig {
  sectionLabel: string
  items: MediumItem[]
}

export interface FooterEntry {
  text: string
  href?: string
}

export interface FooterColumn {
  heading: string
  entries: FooterEntry[]
}

export interface FooterConfig {
  visionText: string
  brandName: string
  columns: FooterColumn[]
  copyright: string
  videoPath: string
}

export interface ProjectDetailConfig {
  backLabel: string
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "ObsidianHire - AI Powered ATS",
  siteDescription: "The intelligent applicant tracking system that uses AI to rank candidates, parse resumes, and streamline your hiring pipeline.",
}

export const navigationConfig: NavigationConfig = {
  brandMark: "OH",
  links: [
    { label: "Features", targetId: "gallery" },
    { label: "Philosophy", targetId: "philosophy" },
    { label: "Modules", targetId: "mediums" },
    { label: "Contact", targetId: "footer" },
  ],
}

export const heroConfig: HeroConfig = {
  wordmarkText: "OBSIDIANHIRE",
  eyebrow: "AI-POWERED TALENT INTELLIGENCE",
  titleLine1: "Hire Smarter.",
  titleLine2: "Hire Faster.",
  descriptionLine1: "The intelligent ATS that uses AI to rank candidates,",
  descriptionLine2: "parse resumes, and streamline your entire hiring pipeline.",
  ctaText: "START HIRING",
  ctaTargetId: "philosophy",
}

export const philosophyConfig: PhilosophyConfig = {
  eyebrow: "OUR PHILOSOPHY",
  title: "Talent Flows",
  body: "Like fluid dynamics, great hiring requires understanding patterns, adapting to change, and creating pathways where talent naturally flows. Our AI doesn't replace human judgment - it amplifies it, surfacing the right candidates at the right time with unprecedented clarity.",
  rollingWords: ["PRECISION", "INTUITION", "FLUIDITY", "TALENT", "INSIGHT", "CLARITY"],
}

export const galleryConfig: GalleryConfig = {
  sectionLabel: "PLATFORM FEATURES / 004",
  title: "Core Modules",
  projects: [
    {
      id: "ai-ranking",
      title: "AI RANKING",
      location: "ML-Powered",
      year: "2024",
      image: "images/project-1.jpg",
      subtitle: "Intelligent candidate scoring using multi-dimensional AI analysis",
      meta: [
        { label: "TYPE", value: "AI/ML Engine" },
        { label: "SPEED", value: "Real-time" },
        { label: "ACCURACY", value: "94.7% Match" },
        { label: "DIMENSIONS", value: "Skills + Exp + Edu" },
      ],
      paragraphs: [
        "Our proprietary AI ranking engine analyzes every candidate across multiple dimensions - technical skills, experience depth, education alignment, and cultural fit indicators. Unlike keyword-based filters, our neural models understand context, synonyms, and skill relationships.",
        "The system generates a composite AI Score (0-100) for each candidate, breaking down contributions from Skill Match, Experience Match, and Education Match. Recruiters can drill into any dimension to understand exactly why a candidate ranked where they did.",
        "Every ranking comes with transparent reasoning. The AI highlights which specific skills matched, flags potential gaps, and suggests interview questions tailored to the candidate's profile. This isn't a black box - it's a hiring partner that explains its thinking.",
      ],
    },
    {
      id: "resume-parse",
      title: "RESUME AI",
      location: "NLP Engine",
      year: "2024",
      image: "images/project-2.jpg",
      subtitle: "Deep resume parsing with skills extraction and gap analysis",
      meta: [
        { label: "TYPE", value: "NLP Parser" },
        { label: "FORMATS", value: "PDF, DOC, TXT" },
        { label: "FIELDS", value: "50+ Extracted" },
        { label: "SPEED", value: "< 3 seconds" },
      ],
      paragraphs: [
        "Upload any resume format and watch as our NLP engine extracts structured data in seconds. Skills, experience timelines, education history, projects, certifications - all parsed into a rich candidate profile that feeds directly into the AI ranking engine.",
        "The parser doesn't just extract - it understands. It recognizes skill synonyms (React.js = React), calculates experience duration automatically, identifies seniority levels, and even flags potential red flags like employment gaps or frequent job changes.",
        "After parsing, the AI generates a comprehensive analysis: strengths, areas for development, missing skills compared to job requirements, and an overall resume quality score. This gives recruiters a complete picture before they even open the original document.",
      ],
    },
    {
      id: "pipeline",
      title: "PIPELINE",
      location: "Kanban Flow",
      year: "2024",
      image: "images/project-3.jpg",
      subtitle: "Visual hiring pipeline with drag-and-drop workflow management",
      meta: [
        { label: "TYPE", value: "Kanban Board" },
        { label: "STAGES", value: "5 Customizable" },
        { label: "ACTIONS", value: "Bulk + Individual" },
        { label: "TRIGGERS", value: "Automated" },
      ],
      paragraphs: [
        "Move candidates through your hiring process with an intuitive Kanban board: Applied, Shortlisted, Interview, Selected, Rejected. Drag and drop cards between columns, or use bulk actions to move multiple candidates at once.",
        "Each pipeline column shows real-time counts and can be filtered by job, source, or AI score range. Color-coded cards indicate candidate status at a glance - green for high AI scores, yellow for pending actions, red for rejected.",
        "Automation rules keep the pipeline flowing without manual intervention. Automatically advance candidates when interview feedback is positive, send rejection emails when moved to the Rejected column, or trigger reference checks when a candidate reaches the Selected stage.",
      ],
    },
    {
      id: "analytics",
      title: "ANALYTICS",
      location: "Data Intelligence",
      year: "2024",
      image: "images/project-4.jpg",
      subtitle: "Comprehensive hiring analytics and performance insights",
      meta: [
        { label: "TYPE", value: "Dashboard" },
        { label: "METRICS", value: "50+ KPIs" },
        { label: "EXPORT", value: "PDF, CSV" },
        { label: "UPDATE", value: "Real-time" },
      ],
      paragraphs: [
        "Track every metric that matters: time-to-hire, source effectiveness, candidate quality by channel, interviewer calibration, offer acceptance rates, and diversity metrics. All visualized in beautiful, interactive charts that update in real-time.",
        "Drill down from high-level trends to individual candidate journeys. See which job boards deliver the best candidates, which interviewers are most predictive of success, and where candidates drop off in your funnel.",
        "Generate executive-ready reports with one click. Share insights with stakeholders, compare performance across teams, and identify process improvements backed by data. Predictive analytics forecast hiring timelines and flag at-risk requisitions.",
      ],
    },
  ],
}

export const mediumsConfig: MediumsConfig = {
  sectionLabel: "PLATFORM MODULES",
  items: [
    {
      cn: "RANK",
      en: "AI RANKING",
      description: "Multi-dimensional candidate scoring using neural networks. Analyzes skills, experience, education, and cultural fit to generate transparent AI-powered rankings with explainable reasoning for every score.",
    },
    {
      cn: "PARSE",
      en: "RESUME AI",
      description: "Advanced NLP engine that parses any resume format in under 3 seconds. Extracts 50+ structured fields, identifies skill synonyms, calculates experience duration, and generates comprehensive candidate profiles automatically.",
    },
    {
      cn: "FLOW",
      en: "PIPELINE",
      description: "Visual Kanban hiring workflow with 5 customizable stages. Drag-and-drop candidate management, bulk actions, automated triggers, and real-time pipeline analytics to keep your hiring process moving smoothly.",
    },
    {
      cn: "DATA",
      en: "ANALYTICS",
      description: "Comprehensive hiring intelligence dashboard with 50+ KPIs. Track time-to-hire, source quality, interviewer calibration, and diversity metrics. Generate executive reports and leverage predictive hiring forecasts.",
    },
    {
      cn: "MATCH",
      en: "JOB MATCHING",
      description: "AI-powered job-candidate matching that goes beyond keywords. Understands skill relationships, experience relevance, and career trajectory to recommend the best-fit opportunities to applicants and ideal candidates to recruiters.",
    },
  ],
}

export const footerConfig: FooterConfig = {
  visionText: "We believe hiring should be as natural as fluid dynamics - understanding patterns, adapting to change, and creating pathways where the best talent naturally flows. ObsidianHire is the intelligent foundation for modern talent acquisition.",
  brandName: "ObsidianHire",
  columns: [
    {
      heading: "PRODUCT",
      entries: [
        { text: "Features", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Integrations", href: "#" },
        { text: "API", href: "#" },
        { text: "Changelog", href: "#" },
      ],
    },
    {
      heading: "RESOURCES",
      entries: [
        { text: "Documentation", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Case Studies", href: "#" },
        { text: "Webinars", href: "#" },
        { text: "Community", href: "#" },
      ],
    },
    {
      heading: "COMPANY",
      entries: [
        { text: "About", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Contact", href: "#" },
        { text: "Legal", href: "#" },
        { text: "Privacy", href: "#" },
      ],
    },
  ],
  copyright: "2024 ObsidianHire. All rights reserved.",
  videoPath: "",
}

export const projectDetailConfig: ProjectDetailConfig = {
  backLabel: "<- Back",
}

export function getProjectById(id: string): ProjectData | undefined {
  return galleryConfig.projects.find((p) => p.id === id)
}
