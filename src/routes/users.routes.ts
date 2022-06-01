import { Router } from "express";
import UsersRepository from "../repositories/UsersRepository";
import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();
const usersRepository = new UsersRepository();


//Route should only receive a request, call another file, return a response. 
usersRouter.get("/", (request, response) => {
    const users = usersRepository.all();
    return response.json(users);
});

usersRouter.post("/", (request, response) => {
    try {
        const { name, email, password } = request.body;

        const CreateUser = new CreateUserService(usersRepository);
        const user = CreateUser.execute({ name, email, password });

        return response.json(user);
    } catch (err) {
        if (err instanceof Error) {
            return response.status(400).json(err.message);
        } else {
            console.log("Unexpected Error", err);
            return response.status(400).json("Unexpected Error");
        }
    }

});

export default usersRouter;