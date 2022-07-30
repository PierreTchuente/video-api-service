import express, {Application, NextFunction, Request, Response } from "express";

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('Help probe');
});

app.listen(3000, () => console.log("node express server listening on port 3000"));