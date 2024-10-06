const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authenticate } = require("./middleware"); // Import authentication middleware

const router = express.Router();
const prisma = new PrismaClient();

// This create new item
router.post("/", authenticate, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only permitted!" });
  }

  const { name, image, quantity } = req.body;
  const userId = req.user.userId;
  const email = req.user.email;

  try {
    const item = await prisma.item.create({
      data: {
        name,
        image,
        quantity,
        created_by: email,
        userId,
      },
    });

    res.status(201).json({ message: "Item created successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create item" });
  }
});


// This gives all the items list with pagination of 10 items per page
router.get("/", authenticate, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const items = await prisma.item.findMany({
      skip: offset,
      take: limit,
    });

    const totalItems = await prisma.item.count();
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({ items, totalPages, currentPage: page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Update item
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, image, quantity } = req.body;

  const userId = req.user.userId;
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only can update!!" });
  }

  try {
    const item = await prisma.item.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!item) {
      return res
        .status(403)
        .json({ error: "You do not have access to this item" });
    }

    // If item found then update
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: {
        name,
        image,
        quantity,
      },
    });

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// This is to Delete item
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only permitted to delete!" });
  }

  try {
    const item = await prisma.item.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!item) {
      return res
        .status(403)
        .json({ error: "You do not have access to this item" });
    }

    await prisma.item.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
