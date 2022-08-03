import express, { Request, Response } from "express";
import logger from "../middleware/logger";
const video = express.Router();

video.get('/', async (req: Request, res: Response) => {
    /*
     This is just a proof of concept. the value (number_video_being_watched) will be 
     retrieved from a session variable stored in redis or memcache through the client,
     base on the user_id as unique key. for now I get it from the request body.
        {
        "user_id": 12,
        "video_id": 1,
        "device_id": 2,
        "location_id": 14337357,
        "number_video_being_watched": 0
        }
    */
    const payload = req.body;
    logger.info(JSON.stringify(payload));
    if (payload.number_video_being_watched >= 0 && payload.number_video_being_watched < 3) {
        payload.number_video_being_watched++;
        res.status(200).send(payload);
    } else {
        res.status(403).send({ "code": 403, "message": "max number of concurrent video watched reached" });
    }


});

video.post('/', async (req: Request, res: Response) => {

});


video.put('/:id', async (req: Request, res: Response) => {

});

video.delete('/:id', async (req: Request, res: Response) => {

});

video.get('/:id', async (req: Request, res: Response) => {

});

export default video;