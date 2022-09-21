import { Router } from 'express';
import multer from "multer";
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

//Route should only receive a request, call another file, return a response. 
// usersRouter.get("/", async (request, response) => {

//     const usersRepository = new UsersRepository();
//     //const usersRepository = getCustomRepository(UsersRepository);
//     const users = await usersRepository.findByEmail();
//     //Remove password of all users to not return encrypted password
//     users.forEach(user => {
//         delete user.password;
//     });
//     return response.json(users);

// });

usersRouter.post("/", celebrate(
    {
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    usersController.create);
usersRouter.get("/", ensureAuthenticated, usersController.index);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;