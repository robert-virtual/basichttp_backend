const { PrismaClient } = require(".prisma/client");
const prisma = PrismaClient();
const router = require("express").Router();

router.get("/", (req, res) => {
  //prisma.;
  res.json();
});

module.exports = router;
