import { Router } from "express";
import { getCustomRepository } from "typeorm";
import RpersRepository from "../repositories/RpersRepository";
import CreateRperService from "../services/CreateRperService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const rpersRouter = Router();

//Middleware to ensure the user is logged in before listing RPERs and Creating new one.
rpersRouter.use(ensureAuthenticated);

//Route should only receive a request, call another file, return a response. 
rpersRouter.get("/", async (request, response) => {
    //User ID is availabe in all routes that use ensureAuthenticated:
    //console.log(request.user);

    const rpersRepository = getCustomRepository(RpersRepository);
    const rpers = await rpersRepository.find();
    return response.json(rpers);
});

rpersRouter.post("/", async (request, response) => {
    try {
        const { name, coordinator_id } = request.body;

        const CreateRper = new CreateRperService();
        const rper = await CreateRper.execute({ name, coordinator_id });

        return response.json(rper);
    } catch (err) {
        if (err instanceof Error) {
            return response.status(400).json(err.message);
        } else {
            console.log("Unexpected Error", err);
            return response.status(400).json("Unexpected Error");
        }
    }

});

export default rpersRouter;