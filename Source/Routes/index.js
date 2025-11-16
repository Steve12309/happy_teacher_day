import HomeController from "../Controllers/homeController.js";

function Routes(app) {
  app.get("/", HomeController.RenderHomeView);
  app.get("/db.json", HomeController.GetHomeData);
}

export default Routes;
