const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    const products = await prisma.product.findMany();
    res.json({ categories, products });
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
