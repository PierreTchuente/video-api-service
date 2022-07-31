import express, { Application, NextFunction, Request, Response } from "express";
import logger from "./middleware/logger";
import video from "./routes/video";

const app: Application = express();
app.use(express.json());

/**Loading api route */
app.use('/api/video', video);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    logger.info(JSON.stringify({ 'status': 'ok', 'health': 'app is healthy' }));
    res.status(200).send({ 'status': 'ok', 'health': 'app is healthy' });
});

logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
const port = process.env.PORT || 3000;
app.listen(port, () => { logger.info(`Server is listening on port ${port}`); });