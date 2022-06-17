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
    const { name, email, password } = request.body;

    const CreateUser = new CreateUserService();
    const user = await CreateUser.execute({ name, email, password });

    //delete user.password; //(Do something to not show hashed password on creation)

    return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    //console.log(request.file);
    // return response.json({ ok: true });

    const updateUserAvatar = new UpdateUserAvatarService();
    if (request.file) {
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        return response.json({ user });
    }
});

export default usersRouter;