const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json({ categories });
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

router.get("/:category_id", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: Number(req.params.category_id),
      },
    });
    res.json({ products });
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
