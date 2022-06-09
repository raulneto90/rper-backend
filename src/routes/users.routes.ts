import { Router } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();


//Route should only receive a request, call another file, return a response. 
// usersRouter.get("/", async (request, response) => {
//     const usersRepository = getCustomRepository(UsersRepository);
//     const users = await usersRepository.find();
//     return response.json(users);
// });

usersRouter.post("/", async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const CreateUser = new CreateUserService();
        const user = await CreateUser.execute({ name, email, password });

        //delete user.password; //(Do something to not show hashed password on creation)

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