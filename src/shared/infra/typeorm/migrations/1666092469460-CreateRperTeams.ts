import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRperTeams1666092469460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'rper_teams',
        columns: [
          {
            name: 'rper_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKTeamRper',
            columnNames: ['rper_id'],
            referencedColumnNames: ['rper_id'],
            referencedTableName: 'rpers',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKTeamUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('rper_teams');
  }
}
