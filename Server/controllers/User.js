const User=require("../model/User")
const passport = require("passport");
const jwt = require("jsonwebtoken");
module.exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const user = new User({
      email,
      username,
    });
    //passport has this funcationality
    //where it has a function called register(variable,password) which
    //saves the user in the db
    const registeredUser = await User.register(user, password);
    console.log("====================================");
    console.log(registeredUser);
    console.log("====================================");
    //abb user jab register karta he should be able to use features
    //par it asking for login
    //therefore theres a methoad called "req.login" which login in the user in the session
    res.status(200).json(registeredUser);
  } catch (err) {
    console.log(err);
  }
};
module.exports.login = (req, res, next) => {
  console.log("====================================");
  console.log("login endpoint");
  console.log("====================================");
  console.log("Request body:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        "secret123",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ message: "Login successful", token });
    });
  })(req, res, next);
};

module.exports.updaterole=async(req,res)=>{
  const { username } = req.params;
  const { role } = req.body;
  console.log(username,role);

  try {
      // Find the user by username
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Update the user's role
      user.role = role;
      await user.save();

      // Respond with updated user
      res.json({ message: "User role updated successfully", user });
  } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getUser=async(req,res)=>{
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }); // Find user by username
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send user data in response
} catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
}
};