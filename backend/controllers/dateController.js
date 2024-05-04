const dateProfile = require("../models/dateProfileModel");
const User = require("../models/userModel");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

const addPic = async (req, res) => {
  const { id: userId } = req.params;

  //req.file.buffer is image data

  //resize image here (modify buffer and send it to s3)

  //make random image names no collisions
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  });

  await s3.send(command);

  //save imagename in recommendationModel

  let userProfile = await dateProfile.findOne({
    profileId: userId,
  });

  if (!userProfile) {
    userProfile = await dateProfile.create({
      profileId: userId,
      imageNames: [req.file.originalname],
    });
    await userProfile.save();
  } else {
    userProfile.imageNames.push(req.file.originalname);
    await userProfile.save();
  }

  res.send({});
};

const getProfilePics = async (req, res) => {
  const { id: userId } = req.params;

  let userProfile = await dateProfile.findOne({
    profileId: userId,
  });

  if (userProfile) {
    //sending imageurl to frontend
    let imageUrls = [];
    for (const image of userProfile.imageNames) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: image,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      imageUrls.push(url);
    }
    await res.status(200).send({ imageUrls });
  }
};

const deletePic = async (req, res) => {};

//get urls from s3 users can see recommendation img for temporary amount of time
//generate url only if user has access - using s3 request presigner

const getProfiles = async (req, res) => {
  //get females for males and males for females (filter option)
  //get all recommendations unmatched and order by rank
  //remove profiles user has already swiped.
  try {
    // Get the current user's gender from the User model
    const { id: userId } = req.params;
    const currentUser = await User.findById(userId);
    const userGender = currentUser.gender;

    // Determine the gender to be filtered based on the user's gender
    const filterGender = userGender === "male" ? "female" : "male";

    // Find unmatched profiles and populate the associated user document
    const unmatchedProfiles = await dateProfile
      .find({
        matched: false,
      })
      .populate({
        path: "profileId",
        select: "gender",
      });

    const filteredProfiles = unmatchedProfiles.filter((profile) => {
      return profile.profileId.gender === filterGender;
    });

    //remove already swiped profiles.
    const userSwipedProfiles = 0;

    let finalProfiles = [];
    finalProfiles.push(null, null);
    for (const profiles of filteredProfiles) {
      let imageUrls = [];
      for (const image of profiles.imageNames) {
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: image,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        imageUrls.push(url);
      }
      finalProfiles.push(profiles.profileId, imageUrls);
    }

    await res.status(200).send(finalProfiles);
  } catch (error) {
    console.error("Error while fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addPic, getProfilePics, getProfiles };
