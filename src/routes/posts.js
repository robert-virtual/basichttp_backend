const { PrismaClient } = require(".prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

router.get("/", (req, res) => {
  prisma.post
    .findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        images: true,
      },
    })
    .then((data) => {
      res.json(data);
    });
});

router.post("/", (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json("no envio el contenido");
  }
  const { round, random } = Math;
  prisma.post
    .create({
      data: {
        content,
        user: {
          create: {
            name: `RamdonUser${round(random() * 1000) + 100}`,
            email: `ramdonuser${round(random() * 1000) + 100}@gmail.com`,
          },
        },
      },
    })
    .then((data) => {
      res.json(data);
    });
});
module.exports = router;
