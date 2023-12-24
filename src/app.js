const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const db = require("./firebase.js"); // Adjust the path based on your project structure
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const port = 3000;

app.use('/api', customerRoutes);


// Set up session middleware
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure passport with Google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Save or retrieve user data from Firestore
      // Example: const user = await saveOrUpdateUser(profile);
      return done(null, user);
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Route for Google OAuth2 authentication
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to the Vue.js app or any other route
    res.redirect("http://localhost:8080");
  }
);

// Protected route example
app.get("/api/data", ensureAuthenticated, async (req, res) => {
  try {
    const snapshot = await db.collection("your-collection").get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
