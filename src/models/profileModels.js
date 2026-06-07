const pool = require("../config/db");

const saveProfile = async (profileData) => {
  const query = `
    INSERT INTO github_profiles
    (
      username,
      name,
      public_repos,
      followers,
      following,
      profile_url,
      account_created_at,
      total_stars,
      top_repository,
      top_repository_stars

    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      public_repos = VALUES(public_repos),
      followers = VALUES(followers),
      following = VALUES(following),
      profile_url = VALUES(profile_url),
      account_created_at = VALUES(account_created_at),
      total_stars = VALUES(total_stars),
      top_repository = VALUES(top_repository),
      top_repository_stars = VALUES(top_repository_stars)
  `;

  const values = [
    profileData.username,
    profileData.name,
    profileData.publicRepos,
    profileData.followers,
    profileData.following,
    profileData.profileUrl,
    new Date(profileData.accountCreatedAt),
    profileData.totalStars,
    profileData.topRepository,
    profileData.topRepositoryStars,
  ];
  console.log(profileData);
console.log(values);
  const [result] = await pool.execute(query, values);

  return result;
};


const getAllProfiles = async (page, limit) => {
  const offset = (page - 1) * limit;

  const [rows] = await pool.query(`
    SELECT *
    FROM github_profiles
    ORDER BY analyzed_at DESC
    LIMIT ${Number(limit)}
    OFFSET ${Number(offset)}
  `);

  return rows;
};

const getProfileByUsername = async (username) => {
  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles WHERE username = ?",
    [username]
  );

  return rows[0];
};


const getProfilesCount = async () => {
  const [rows] = await pool.execute(
    "SELECT COUNT(*) AS total FROM github_profiles"
  );

  return rows[0].total;
};


module.exports = { saveProfile, getAllProfiles, getProfileByUsername, getProfilesCount };