import { Router } from "express";
import usersRouter from "./users.routes";
import rpersRouter from "./rpers.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/users", usersRouter)
routes.use("/rpers", rpersRouter)
routes.use("/sessions", sessionsRouter)

export default routes;