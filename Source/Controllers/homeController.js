import fs from "fs/promises";

class HomeController {
  RenderHomeView(req, res, next) {
    res.render("home", {
      layout: "main",
      function: "home",
      style: "home",
    });
  }

  async GetHomeData(req, res, next) {
    try {
      let data = await fs.readFile("Source/Static/Public/JS/db.json", "utf-8");
      let jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new HomeController();
