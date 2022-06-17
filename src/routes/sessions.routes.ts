import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";
import AppError from "../errors/AppError";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
        email,
        password
    });

    //delete user.password; Same, remove this information from response.

    return response.json({ user, token });
});

export default sessionsRouter;