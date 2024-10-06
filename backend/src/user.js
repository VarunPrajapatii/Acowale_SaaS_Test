const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

// validate token logic
router.post("/validate-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "No token provided!" });
  }

  try {
    // This is to verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({ message: "Token is valid!", decoded });
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ error: "Invalid or expired token!" });
  }
});


router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Hashed password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ message: "User created successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User creation failed!" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    // To check the password we compare it as we cant decrypt it
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ message: "Sign in successful!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sign in failed!" });
  }
});

module.exports = router;
