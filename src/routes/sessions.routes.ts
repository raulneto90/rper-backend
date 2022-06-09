import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password
        });

        //delete user.password; Same, remove this information from response.

        return response.json({ user, token });
    } catch (err) {
        if (err instanceof Error) {
            return response.status(400).json(err.message);
        } else {
            console.log("Unexpected Error", err);
            return response.status(400).json("Unexpected Error");
        }
    }

});

export default sessionsRouter;