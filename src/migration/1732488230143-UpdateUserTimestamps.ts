import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTimestamps1732488230143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "user" 
          ALTER COLUMN "createdAt" TYPE timestamp with time zone USING "createdAt"::timestamp with time zone,
          ALTER COLUMN "updatedAt" TYPE timestamp with time zone USING "updatedAt"::timestamp with time zone;
        `);
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE "user" 
          ALTER COLUMN "createdAt" TYPE bigint USING EXTRACT(EPOCH FROM "createdAt")::bigint,
          ALTER COLUMN "updatedAt" TYPE bigint USING EXTRACT(EPOCH FROM "updatedAt")::bigint;
        `);
      }

}
