import { Router } from "express";
import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { getCustomRepository } from "typeorm";
import UsersRepository from "@modules/users/repositories/UsersRepository";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

//Route should only receive a request, call another file, return a response. 
usersRouter.get("/", async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    //Remove password of all users to not return encrypted password
    users.forEach(user => {
        delete user.password;
    });
    return response.json(users);

});

usersRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body;

    const CreateUser = new CreateUserService();
    const user = await CreateUser.execute({ name, email, password });

    delete user.password;
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
        delete user.password;
        return response.json({ user });
    }
});

export default usersRouter;