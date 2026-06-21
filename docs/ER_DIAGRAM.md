# ATS Database ER Diagram

```mermaid
erDiagram
  USER ||--o{ JOB : posts
  USER ||--o{ APPLICATION : submits
  USER ||--o{ RESUME : owns
  USER ||--o{ NOTIFICATION : receives
  USER ||--o{ ACTIVITY_LOG : performs
  JOB ||--o{ APPLICATION : receives
  APPLICATION ||--|| AI_ANALYSIS : has

  USER {
    ObjectId _id
    string name
    string email
    string password
    string role
    string profileImage
    string phone
    string[] skills
    string experience
    string education
    date createdAt
  }

  JOB {
    ObjectId _id
    string title
    string company
    string description
    string[] skills
    number salary
    string location
    string employmentType
    string experienceRequired
    ObjectId recruiterId
    date createdAt
  }

  APPLICATION {
    ObjectId _id
    ObjectId applicantId
    ObjectId jobId
    string status
    number aiScore
    date createdAt
  }

  RESUME {
    ObjectId _id
    ObjectId applicantId
    string fileUrl
    string extractedText
    date createdAt
  }

  AI_ANALYSIS {
    ObjectId _id
    ObjectId applicationId
    number score
    string summary
    string[] matchedSkills
    string[] missingSkills
    string[] strengths
    string[] weaknesses
    date createdAt
  }

  NOTIFICATION {
    ObjectId _id
    ObjectId userId
    string title
    string message
    boolean read
    date createdAt
  }

  ACTIVITY_LOG {
    ObjectId _id
    ObjectId userId
    string action
    date timestamp
  }
```

## References

- `Job.recruiterId` references `User`.
- `Application.applicantId` references `User`.
- `Application.jobId` references `Job`.
- `Resume.applicantId` references `User`.
- `AIAnalysis.applicationId` references `Application`.
- `Notification.userId` references `User`.
- `ActivityLog.userId` references `User`.

## Indexes

- `User.email`
- `Job.title`
- `Job.skills`
- `Job.location`
- `Application.applicantId + Application.jobId`
- `Resume.applicantId`
- `AIAnalysis.applicationId`
- `Notification.userId + Notification.read`
- `ActivityLog.userId + ActivityLog.timestamp`
