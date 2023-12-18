import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async(request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Para enviar precisa dos campos necessarios: titulo, autor e ano de publicacao',
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook)

        return response.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/', async(request, response) => {
    try{
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.get('/:id', async(request, response) => {
    try{

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.put('/:id' , async(request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Para enviar precisa dos campos necessarios: titulo, autor e ano de publicacao',
            })
         }

         const { id } = request.params;

         const result = await Book.findByIdAndUpdate(id, request.body);

         if (!result) {
                return response.status(404).json({ message: 'Livro nao encontrado'});
            }

            return response.status(200).send({message: 'Livro atualizado com sucesso'})

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Livro nao encontrado'})
        }

        return response.status(200).send({message: 'Livro deletado com sucesso'})

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;