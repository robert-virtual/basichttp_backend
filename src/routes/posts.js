const { PrismaClient } = require(".prisma/client");
const upload = require("../config/multer");
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

router.post("/", upload.array("images"), (req, res) => {
  const { content } = req.body;
  if (!content) {
    console.log("body: ", req.body);
    return res.status(400).json("no envio el contenido");
  }
  const { round, random } = Math;
  prisma.post
    .create({
      data: {
        content,
        images: {
          create: req.files.map((f) => ({ url: f.filename })),
        },
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
    })
    .catch((error) => {
      res.status(500).json({ files: req.files, msg: error });
    });
});
module.exports = router;
