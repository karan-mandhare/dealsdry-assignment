import { User } from "../model/user.modules.js";

const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (
      [name, email, username, password].some((field) => field?.trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "User with email and username already exist",
      });
    }

    const user = await User.create({
      name,
      email,
      username,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (await User.find(user._id)) {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        createdUser,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username or password are required",
      });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "username is invalid",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // generate jwt token containing userid
    const { accessToken } = await generateAccessTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({
        success: true,
        user: [loggedInUser, accessToken],
        message: "User logged In Successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logOutUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res.status(200).clearCookie("accessToken", options).json({
    success: true,
    message: "User logged Out",
    user: [],
  });
};

const getCurrentUser = (req, res) => {
  try {
    const user = req.user;
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User fetched successfully",
        user,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { createUser, loginUser, logOutUser, getCurrentUser };
