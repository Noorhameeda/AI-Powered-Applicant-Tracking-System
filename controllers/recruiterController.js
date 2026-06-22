const rankings = await Application.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "candidate"
    }
  },

  {
    $lookup: {
      from: "jobs",
      localField: "job",
      foreignField: "_id",
      as: "job"
    }
  },

  {
    $unwind: "$candidate"
  },

  {
    $unwind: "$job"
  },

  {
    $project: {
      name: "$candidate.name",
      email: "$candidate.email",
      jobTitle: "$job.title",
      aiScore: 1,
      status: 1
    }
  },

  {
    $sort: {
      aiScore: -1
    }
  }
]);