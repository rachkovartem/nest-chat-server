import {MigrationInterface, QueryRunner} from "typeorm";

export class todoapp1644414921859 implements MigrationInterface {
    name = 'todoapp1644414921859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todoapp" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "email" character varying NOT NULL, "ready" boolean NOT NULL, "userId" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_78423b39e428273a93481088f72" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "todoapp"`);
    }

}
