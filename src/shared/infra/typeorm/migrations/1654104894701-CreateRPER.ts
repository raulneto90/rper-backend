import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRPER1654104894701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rpers',
                columns: [
                    {
                        name: 'rper_id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'coordinator_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );

        await queryRunner.createForeignKey('rpers', new TableForeignKey({
            name: 'RperCoordinatorID',
            columnNames: ['coordinator_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('rpers', 'RperCoordinatorID');
        await queryRunner.dropTable('rpers');
    }

}
