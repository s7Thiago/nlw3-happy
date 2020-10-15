import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

export default {
    // Pode ser usado para controlar o que vai ou não aparecer no corpo do json de cada orfanato
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        }
    },
    // Abstrai o render criado anteriormente para retornar uma lista com vários orfanatos
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}