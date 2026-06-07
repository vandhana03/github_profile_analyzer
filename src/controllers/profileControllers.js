const { getGitHubProfile,getGitHubRepos } = require("../services/githubService");
const { saveProfile } = require("../models/profileModels");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await getGitHubProfile(username);
    const repos = await getGitHubRepos(username);
    const totalStars = repos.reduce(
  (sum, repo) => sum + repo.stargazers_count,
  0
);
  const topRepo =
  repos.length > 0
    ? repos.reduce((best, current) =>
        current.stargazers_count > best.stargazers_count
          ? current
          : best
      )
    : null;


    const analysis = {
      username: profile.login,
      name: profile.name,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      profileUrl: profile.html_url,
      accountCreatedAt: profile.created_at,
      totalStars,
      topRepository: topRepo?.name || null,
      topRepositoryStars: topRepo?.stargazers_count || 0,
    };

    await saveProfile(analysis);

    res.status(200).json({
      message: "Profile analyzed and stored successfully",
      data: analysis,
    });
  } catch (error) {
    console.error(error);

    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "GitHub user not found",
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const {
  getAllProfiles,
  getProfilesCount,
} = require("../models/profileModels");

const fetchAllProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const profiles = await getAllProfiles(page, limit);
    const total = await getProfilesCount();

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      profiles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profiles",
    });
  }
};
const { getProfileByUsername } = require("../models/profileModels");

const fetchSingleProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await getProfileByUsername(username);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

module.exports = { analyzeProfile, fetchAllProfiles, fetchSingleProfile };