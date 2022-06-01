import { Router } from "express";
import usersRouter from "./users.routes";
import rpersRouter from "./rpers.routes";

const routes = Router();

routes.use("/users", usersRouter)
routes.use("/rpers", rpersRouter)
export default routes;