import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import RpersController from '../controllers/RpersController';

const rpersRouter = Router();
const rpersController = new RpersController();

//Middleware to ensure the user is logged in before listing RPERs and Creating new one.
rpersRouter.use(ensureAuthenticated);

rpersRouter.post("/", rpersController.create);
rpersRouter.get("/", rpersController.index);

export default rpersRouter;


//ROUTE TO GET ALL THE RPERs.
//Route should only receive a request, call another file, return a response.
// rpersRouter.get("/", async (request, response) => {
//     //User ID is availabe in all routes that use ensureAuthenticated:
//     //console.log(request.user);

//     const rpers = await rpersRepository.find();
//     return response.json(rpers);
// });

// rpersRouter.get("/", async (request, response) => {
//     const rpersRepository = new RpersRepository();

//     const rperList = new CreateRperService(rpersRepository);
//     const rpers = await rperList.findRperByName();

//     return response.json(rperList);

//     //     //User ID is availabe in all routes that use ensureAuthenticated:
//     //     //console.log(request.user);

//     //     const rpers = await rpersRepository.find();
//     //     return response.json(rpers);
//     // });
// });