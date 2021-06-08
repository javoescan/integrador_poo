import {MigrationInterface, QueryRunner} from "typeorm";

export class RedeemsTables1623118654479 implements MigrationInterface {
    name = 'RedeemsTables1623118654479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `redeems` (`id` varchar(36) NOT NULL, `date` timestamp NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` timestamp(6) NULL, `user_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `redeem_products` (`id` varchar(36) NOT NULL, `price` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` timestamp(6) NULL, `redeem_id` varchar(36) NULL, `product_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD `credits` int NOT NULL");
        await queryRunner.query("ALTER TABLE `redeems` ADD CONSTRAINT `FK_56f4c2ed2bcbf96e220c1a47a6b` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `redeem_products` ADD CONSTRAINT `FK_1af31b03b6489a97ee2b93865d6` FOREIGN KEY (`redeem_id`) REFERENCES `redeems`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `redeem_products` ADD CONSTRAINT `FK_fa28e53d1775d2cffa08e362165` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `redeem_products` DROP FOREIGN KEY `FK_fa28e53d1775d2cffa08e362165`");
        await queryRunner.query("ALTER TABLE `redeem_products` DROP FOREIGN KEY `FK_1af31b03b6489a97ee2b93865d6`");
        await queryRunner.query("ALTER TABLE `redeems` DROP FOREIGN KEY `FK_56f4c2ed2bcbf96e220c1a47a6b`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `credits`");
        await queryRunner.query("DROP TABLE `redeem_products`");
        await queryRunner.query("DROP TABLE `redeems`");
    }

}
