import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import SocketServer from './SocketServer';
import AllowedOrigins from './src/Origins';
import BlogRouter from './src/routes/blogRouter';
import { errorMiddleware, notFound } from './src/middlewares/ErrorMiddleware';
const app = express();
const PORT = config.PORT;
const http = createServer(app);
app.use(
  cors({
    origin: config.Client_URL,
    credentials: true,
  }),
);

app.use(helmet());
app.use(morgan('dev'));
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    http.listen(PORT, () => {
      console.log(`Successfully started at http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });

const io = new Server(http, {
  cors: {
    origin: AllowedOrigins,
    credentials: true,
  },
});
io.on('connection', (socket: Socket) => {
  SocketServer(socket);
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/blog', BlogRouter);
app.use(notFound);
app.use(errorMiddleware);
