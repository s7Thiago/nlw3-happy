import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default {

    async show(request: Request, response: Response) {
        // Pegando o id dos Route params
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images'] // Para que as imagens associadas a um orfanato apareçam no json, passamos o nome da relação no campo relations
        });
        return response.json(orphanageView.render(orphanage));
    },

    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'] // Para que as imagens associadas a um orfanato apareçam no json, passamos o nome da relação no campo relations
        });
        return response.json(orphanageView.renderMany(orphanages));
    },

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

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        // Criando um novo orfanato
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });

        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage);
    }
};