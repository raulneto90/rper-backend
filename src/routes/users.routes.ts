import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

//Route should only receive a request, call another file, return a response. 
usersRouter.get("/", async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return response.json(users);
});

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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    //console.log(request.file);
    // return response.json({ ok: true });

    try {
        const updateUserAvatar = new UpdateUserAvatarService();
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json({ user });

    } catch (err) {
        console.log("Unexpected Error", err);
        return response.status(400).json("Unexpected Error");
    }
});

export default usersRouter;