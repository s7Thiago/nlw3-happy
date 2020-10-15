import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
    async create(request: Request, response: Response) {
        // Desestruturando o corpo da requisição par apegar os dados do orfanato que será cadastrado
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);

        // Criando um novo orfanato
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        });

        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage);
    }
};