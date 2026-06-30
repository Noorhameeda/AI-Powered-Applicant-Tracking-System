
const mongoose = require("mongoose");
const Job = require("./models/Job");
const User = require("./models/User");

mongoose
  .connect("mongodb://localhost:27017/ats_db")
  .then(async () => {
    console.log("MongoDB Connected");

    // Clear old demo data
    await Job.deleteMany({});
    await User.deleteMany({});

    // Create demo users
    const users = await User.insertMany([
      {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        password: "password123",
        role: "candidate",
      },
      {
        name: "Priya Reddy",
        email: "priya@example.com",
        password: "password123",
        role: "candidate",
      },
      {
        name: "Amit Kumar",
        email: "amit@example.com",
        password: "password123",
        role: "candidate",
      },
      {
        name: "Sneha Patel",
        email: "sneha@example.com",
        password: "password123",
        role: "candidate",
      },
    ]);

    // Create demo jobs
    await Job.insertMany([
      {
        title: "Software Engineer",
        description: "Develop and maintain web applications.",
        company: "Tech Solutions",
        location: "Hyderabad",
        skills: ["JavaScript", "Node.js", "MongoDB"],
        salary: 800000,
        experience: 0,
      },
      {
        title: "Frontend Developer",
        description: "Build responsive UI using React.",
        company: "Web Innovations",
        location: "Bangalore",
        skills: ["React", "HTML", "CSS"],
        salary: 700000,
        experience: 1,
      },
      {
        title: "Backend Developer",
        description: "Develop APIs and backend services.",
        company: "Cloud Systems",
        location: "Chennai",
        skills: ["Node.js", "Express", "MongoDB"],
        salary: 900000,
        experience: 3,
      },
      {
        title: "AI Engineer",
        description: "Build AI and ML solutions.",
        company: "AI Labs",
        location: "Pune",
        skills: ["Python", "TensorFlow", "Machine Learning"],
        salary: 1200000,
        experience: 5,
      },
      {
        title: "Data Scientist",
        description: "Analyze data and create predictive models.",
        company: "Data Analytics",
        location: "Mumbai",
        skills: ["Python", "SQL", "Pandas"],
        salary: 1100000,
        experience: 3,
      },
    ]);

    console.log("Demo users and jobs inserted successfully");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
