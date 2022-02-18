import {MigrationInterface, QueryRunner} from "typeorm";

export class chat1645168663177 implements MigrationInterface {
    name = 'chat1645168663177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("messageId" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomId" character varying NOT NULL, "senderId" character varying NOT NULL, "senderUsername" character varying NOT NULL, "message" character varying NOT NULL, "sendingDate" character varying NOT NULL, CONSTRAINT "PK_9743b3cec687ac55895f0d79ae0" PRIMARY KEY ("messageId"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("roomId" uuid NOT NULL DEFAULT uuid_generate_v4(), "participants" character varying NOT NULL, "creationDate" character varying NOT NULL, CONSTRAINT "PK_31962cf242c2fdc6889493d9a99" PRIMARY KEY ("roomId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "registration" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
