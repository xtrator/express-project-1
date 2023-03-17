const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/cart/:idsArr", async (req, res) => {
  const idsArr = JSON.parse(req.params.idsArr).map((id) => Number(id));
  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: idsArr,
        },
      },
    });
    res.json({ products });
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

router.get("/search/:keywords", async (req, res) => {
  let keywords = req.params.keywords;
  console.log(keywords);
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: keywords,
        },
      },
    });
    res.json({ products });
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

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
