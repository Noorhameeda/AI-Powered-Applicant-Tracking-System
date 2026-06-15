# Presentation Outline

## Page 1 [cover]
- **Title**: AI-Powered Applicant Tracking System
- **Content**: Complete Architecture & Technical Design | 5 Developers | 4 Weeks | MERN Stack + Gemini AI

## Page 2 [table_of_contents]
- **Title**: Agenda
- **Content**: 1. Project Overview; 2. Technical Architecture; 3. Implementation Plan

## Page 3 [chapter]
- **Title**: 01 Project Overview
- **Content**: Business problem, solution, and system goals

## Page 4 [content]
- **Title**: The Hiring Challenge: 23 Hours Lost Per Hire
- **Content**: Traditional ATS inefficiencies (manual screening, bias, inconsistency), our AI solution with Gemini API, key metrics (83% time reduction, 70% faster shortlisting)

## Page 5 [content]
- **Title**: Three Users, One Powerful Platform
- **Content**: Admin (user management, analytics), Recruiter (job posting, candidate ranking), Applicant (job search, resume upload, application tracking)

## Page 6 [chapter]
- **Title**: 02 Technical Architecture
- **Content**: Database, AI module, security, and API design

## Page 7 [content]
- **Title**: MongoDB Schema: 8 Collections, Fully Indexed
- **Content**: Users, Jobs, Applications, Resumes, AIAnalysis, Notifications, Emails, ActivityLogs collections with relationships, indexes, and validation rules

## Page 8 [content]
- **Title**: AI Scoring Engine: Weighted Algorithm
- **Content**: Skills Match 40%, Experience 30%, Education 15%, Projects 15%. Gemini API integration with prompt engineering, semantic matching, candidate ranking

## Page 9 [content]
- **Title**: Security at Every Layer
- **Content**: JWT auth (15min access + 7day refresh), bcrypt 12 rounds, Helmet.js, rate limiting, input validation, XSS protection, CORS, MongoDB sanitization

## Page 10 [content]
- **Title**: 25 REST APIs Across 8 Endpoints
- **Content**: Auth APIs (/api/auth), Job APIs (/api/jobs), Application APIs (/api/applications), Resume APIs (/api/resumes), AI APIs (/api/ai), Notification APIs (/api/notifications)

## Page 11 [chapter]
- **Title**: 03 Implementation Plan
- **Content**: Team structure, timeline, and deployment

## Page 12 [content]
- **Title**: 5 Developers, 4 Domains, 28 Days
- **Content**: Dev 1: Auth & Security, Dev 2: Job Management, Dev 3: Resume & AWS, Dev 4: AI Integration, Dev 5: Frontend & Deploy

## Page 13 [content]
- **Title**: 4-Week Sprint Schedule
- **Content**: Week 1: Setup & Foundation, Week 2: Core Features, Week 3: Integration & Polish, Week 4: Testing & Deployment

## Page 14 [content]
- **Title**: Deployed on Vercel + Render + MongoDB Atlas
- **Content**: Frontend on Vercel CDN, Backend on Render, MongoDB Atlas cluster, AWS S3 for resumes, Gemini API for AI. CI/CD with GitHub Actions

## Page 15 [final]
- **Title**: Ready to Build
- **Content**: AI-Powered ATS: Smarter hiring decisions, faster time-to-hire, better candidate experience
