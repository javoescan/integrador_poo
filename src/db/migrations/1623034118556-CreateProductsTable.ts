import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductsTable1623034118556 implements MigrationInterface {
    name = 'CreateProductsTable1623034118556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `products` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `price` int NOT NULL, `stock` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `products`");
    }

}
