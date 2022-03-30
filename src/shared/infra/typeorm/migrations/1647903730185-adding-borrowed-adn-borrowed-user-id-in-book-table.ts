import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addingBorrowedAdnBorrowedUserIdInBookTable1647903730185
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('books', [
      new TableColumn({
        name: 'borrowed',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
      new TableColumn({
        name: 'borrowed_user_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        name: 'BookUserBorrowed',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['borrowed_user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('books', 'borrowed');
    await queryRunner.dropColumn('books', 'borrowed_user_id');
  }
}
