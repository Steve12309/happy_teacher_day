import Routes from "./Routes/index.js";
import express from "express";
import path from "path";
import exphbs from "express-handlebars";
import { fileURLToPath } from "url";

const app = express();
const port = 3300;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const handlebars = exphbs.create({
  layoutsDir: path.join(__dirname, "/Views/layouts"),
  partialsDir: path.join(__dirname, "/Views/partials"),
  defaultLayout: "main",
  extname: "hbs",
});

app.set("views", path.join(__dirname, "/Views"));
app.engine("hbs", handlebars.engine);
app.set("view engine", ".hbs");
app.use(
  "/Static/Images",
  express.static(path.join(__dirname, "Static/Images"))
);
app.use("/Static", express.static(path.join(__dirname, "Static/Public")));

Routes(app);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
