import User from "../models/userModel.js";
import AppError from "../utils/error.utils.js";

/***
 * @Register @Flow
 * * */

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  httpOnly: true,
  secure: true,
};

const register = async () => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return new next(new AppError("All field are Required !", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return new next(new AppError("User already exists", 400));
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    if (!user) {
      return new next(new AppError("User registration failed", 400));
    }
    await user.save();
    user.password = undefined;

    const token = await user.generateJWTtoken();
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User register Successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return new next(new AppError("ALL field required", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.comparePassword(password)) {
      return new next(new AppError("Email or Password doesn't match", 400));
    }
    const token = await user.generateJWTtoken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User login Successfully",
      user,
    });
  } catch (error) {
    return new next(new AppError(`Something wrong ${error.message}`, 400));
  }
};

/**
 * @CATEGORY @WISE_DETAILS
 */

/**
 * @LIST_OF_SHOP_DETAILS
 */

/**
 * @LIST_OFFER_PRODUCTS
 */

/**
 * @COMPARE_PRODUCTS_COST & @FEATURES
 */

/**
 * @FILTER
 */

/**
 * @SHOP_WISE_OFFER
 */

/**
 * @FLOOR_WISE_DETAILS
 */

/**
 * @VIEW_SHOP_DETAILS
 */

export { register, login };
