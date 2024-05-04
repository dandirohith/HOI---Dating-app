const Swipe = require("../models/swipeModel.js");

// @desc    swipe right
// @route   POST /api/swipes/right
// @access  User
// @todo    add liked userid to userLikes and add current userid to likesUser of liked
const swipeRight = async (req, res) => {
  try {
    const { id: likedUserId } = req.params;
    const userId = req.user._id;

    let swipe = await Swipe.findOne({
      swiperId: userId,
    });

    if (!swipe) {
      swipe = await Swipe.create({
        swiperId: userId,
      });
    }
    //add the person who is being looked
    swipe.userLikes.push(likedUserId);

    let swipeMatch = await Swipe.findOne({
      swiperId: likedUserId,
    });

    if (!swipeMatch) {
      swipeMatch = await Swipe.create({
        swiperId: likedUserId,
      });
    }

    swipeMatch.likesUser.push(userId);

    if (swipe && swipeMatch) {
      await Promise.all([swipe.save(), swipeMatch.save()]);
      res.status(201).json(swipeMatch);
    }
  } catch (error) {
    console.log("error in swipeRight", error.message);
    res.status(500).json({ eror: "Internal server error" });
  }
};

// @desc    swipe left
// @route   POST /api/swipes/left
// @access  User
// @todo    add liked userid to userDislikes
const swipeLeft = async (req, res) => {
  try {
    const { id: dislikedUserId } = req.params;
    const userId = req.user._id;

    let swipe = await Swipe.findOne({
      swiperId: userId,
    });

    if (!swipe) {
      swipe = await Swipe.create({
        swiperId: userId,
      });
    }
    //add the person who is being looked
    swipe.userDislikes.push(dislikedUserId);

    if (swipe) {
      swipe.save();
      res.status(201).json(swipe);
    }
  } catch (error) {
    console.log("error in swipeRight", error.message);
    res.status(500).json({ eror: "Internal server error" });
  }
};

// @desc    get match if any
// @route   POST /api/swipes/
// @access  User
// @todo    find first id that appears in likesUser which is also in userLikes

module.exports = { swipeRight, swipeLeft };
