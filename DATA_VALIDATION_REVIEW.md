# Data Validation Review

## Required Fields

Jobs
- title
- company
- description
- location

Applicants
- name
- email
- resume

## Unique Fields

Applicants
- email

## Indexes

Jobs
- title
- location

Applicants
- email

## Relations

Application -> Job
Application -> Applicant