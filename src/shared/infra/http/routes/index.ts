import { Router } from "express";
import rpersRouter from "@modules/rpers/infra/http/routes/rpers.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";

const routes = Router();

routes.use("/users", usersRouter)
routes.use("/rpers", rpersRouter)
routes.use("/sessions", sessionsRouter)

export default routes;