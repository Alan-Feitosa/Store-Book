import express, {request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

app.use(express.json())

app.use(cors())

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Salve')
});

app.use("/books", booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Conectado a database');
        app.listen(PORT, () => {
            console.log(`Esta sendo executado na porta: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });