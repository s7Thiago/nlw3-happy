//Comando que criou essa migration: yarn typeorm migration:create -n create_images
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602724888098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                { name: 'id', type: 'integer', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'path', type: 'varchar' },
                { name: 'orphanage_id', type: 'integer' }
            ], foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE', // Caso o id do orfanato associado a essa imagem mude, o cascade faz a mudança se refletir na tabela de imagens
                    onDelete: 'CASCADE', // se o orfanato for deletado do banco de dados, as imagens vão junto
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
