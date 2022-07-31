import express, { Application, NextFunction, Request, Response } from "express";
const video = express.Router();

video.get('/', async (req: Request, res: Response) => {
    res.status(200).send("video endpoint hit");
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