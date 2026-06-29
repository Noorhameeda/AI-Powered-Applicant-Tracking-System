require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const connectDB = require("../config/db");

const User = require("../models/User");
const Job = require("../models/Job");
const Resume = require("../models/Resume");
const Application = require("../models/Application");

const seedData = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");

    await Application.deleteMany({});
    await Resume.deleteMany({});
    await Job.deleteMany({});
    await User.deleteMany({});

    console.log("Generating Users...");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [];

    for (let i = 0; i < 50; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
        role: i < 5 ? "recruiter" : "candidate",
      });
    }

    const createdUsers = await User.insertMany(users);

    console.log("50 Users Created");

    const recruiters = createdUsers.filter(
      (user) => user.role === "recruiter"
    );

    console.log("Generating Jobs...");

    const jobs = [];

    for (let i = 0; i < 25; i++) {
      jobs.push({
        title: faker.person.jobTitle(),
        description: faker.lorem.paragraphs(2),
        company: faker.company.name(),
        location: faker.location.city(),
        skills: [
          "JavaScript",
          "Node.js",
          "React",
          "MongoDB",
          "Express",
        ],
        salary: faker.number.int({
          min: 300000,
          max: 1500000,
        }),
        experience: faker.number.int({
          min: 0,
          max: 10,
        }),
        recruiter:
          recruiters[
            Math.floor(Math.random() * recruiters.length)
          ]._id,
      });
    }

    const createdJobs = await Job.insertMany(jobs);

    console.log("25 Jobs Created");

    console.log("Generating Resumes...");

    const resumes = [];

    for (let i = 0; i < 50; i++) {
      resumes.push({
        applicantId: createdUsers[i]._id,
        fileUrl: `https://example.com/resume-${i + 1}.pdf`,
        extractedText: faker.lorem.paragraphs(3),
      });
    }

    const createdResumes = await Resume.insertMany(resumes);

    console.log("50 Resumes Created");

    console.log("Generating Applications...");

    const applications = [];

    for (let i = 0; i < 200; i++) {
      const candidate =
        createdUsers[
          Math.floor(Math.random() * createdUsers.length)
        ];

      const job =
        createdJobs[
          Math.floor(Math.random() * createdJobs.length)
        ];

      const resume =
        createdResumes[
          Math.floor(Math.random() * createdResumes.length)
        ];

      applications.push({
        user: candidate._id,
        job: job._id,
        resume: resume._id,
        status: faker.helpers.arrayElement([
          "Applied",
          "Shortlisted",
          "Interview",
          "Selected",
          "Rejected",
        ]),
        aiScore: faker.number.int({
          min: 40,
          max: 100,
        }),
        matchedSkills: ["JavaScript", "React"],
        missingSkills: ["AWS"],
      });
    }

    try {
      await Application.insertMany(applications, {
        ordered: false,
      });
    } catch (err) {
      console.log(
        "Duplicate applications skipped (expected due to unique index)"
      );
    }

    console.log("Applications Created");
    console.log("Seed Data Generated Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();