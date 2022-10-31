const express = require("express");
const app = express();

app.use("/static", express.static(__dirname + "/public"));

const { Router } = express;

const autosRouter = new Router();

autosRouter.use(express.json());
autosRouter.use(express.urlencoded({ extended: true }));

const autos = [];

autosRouter.get("/", (req, res) => {
  res.json(autos);
});

function addId(req, res, next) {
  req.body.id = autos.length + 1;
  next();
}

autosRouter.post("/", addId, (req, res) => {
  autos.push(req.body);
  res.json(req.body);
});

autosRouter.delete("/:id", (req, res) => {
  autos.splice(req.params.id - 1, 1);
  res.json(mascotas);
});

app.use("/autos", autosRouter);

app.use((req, res, next) => {
  res.status(400).send("Error producto no encontrado");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));