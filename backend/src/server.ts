import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

// Libera o acesso para que front-ends em outras portas possam acessar e consumir esta api
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Mapeia o caminho onde ficam as imagens para que elas possam ser acessadas pela url no json
app.use(errorHandler);

app.listen(3333);