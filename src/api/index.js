import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import images from "./images.route.js";

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use("/facets", facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    // res.json({ version });
    res.send("hello world");
  });

  images(api, db);

  return api;
};
