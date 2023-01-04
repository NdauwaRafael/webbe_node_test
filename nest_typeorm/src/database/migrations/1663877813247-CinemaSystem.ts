import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
    /**
     # ToDo: Create a migration that creates all tables for the following user stories

     For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
     To not introduce additional complexity, please consider only one cinema.

     Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

     ## User Stories

     **Movie exploration**
     * As a user I want to see which films can be watched and at what times
     * As a user I want to only see the shows which are not booked out

     **Show administration**
     * As a cinema owner I want to run different films at different times
     * As a cinema owner I want to run multiple films at the same time in different showrooms

     **Pricing**
     * As a cinema owner I want to get paid differently per show
     * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

     **Seating**
     * As a user I want to book a seat
     * As a user I want to book a vip seat/couple seat/super vip/whatever
     * As a user I want to see which seats are still available
     * As a user I want to know where I'm sitting on my ticket
     * As a cinema owner I dont want to configure the seating for every show
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movies',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'duration',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'rating',
                    type: 'numeric',
                    isNullable: false
                },
                {
                    name: 'release_date',
                    type: 'timestamp with time zone',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: 'showrooms',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'capacity',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'layout',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'location',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: 'screens',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'showroom_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'movie_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'screening_time',
                    type: 'timestamp with time zone',
                    isNullable: false
                },
                {
                    name: 'price',
                    type: 'numeric',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: 'seats',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'screen_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'seat_type',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'premium_price',
                    type: 'numeric',
                    isNullable: false
                },
                {
                    name: 'row',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'number',
                    type: 'integer',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: 'bookings',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'screen_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'seat_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'user_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'booked_at',
                    type: 'timestamp with time zone',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: 'ticket_prices',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'screen_id',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'seat_type',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'price',
                    type: 'integer',
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createTable(new Table({
            name: 'shows',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'start_time',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'end_time',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'screen_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'movie_id',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));


        await queryRunner.createForeignKey('screens', new TableForeignKey({
            columnNames: ['showroom_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'showrooms',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('movies', new TableForeignKey({
            columnNames: ['genre_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            onDelete: 'SET NULL'
        }));

        await queryRunner.createForeignKey('shows', new TableForeignKey({
            columnNames: ['screen_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'screens',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('shows', new TableForeignKey({
            columnNames: ['movie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('bookings', new TableForeignKey({
            columnNames: ['show_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'shows',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('bookings', new TableForeignKey({
            columnNames: ['seat_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'seats',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('ticket_prices', new TableForeignKey({
            columnNames: ['screen_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'screens',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('ticket_prices', new TableForeignKey({
            columnNames: ['seat_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'seat_types',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('seats', new TableForeignKey({
            columnNames: ['screen_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'screens',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('seats', new TableForeignKey({
            columnNames: ['seat_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'seat_types',
            onDelete: 'SET NULL'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('seats');
        await queryRunner.dropTable('ticket_prices');
        await queryRunner.dropTable('bookings');
        await queryRunner.dropTable('shows');
        await queryRunner.dropTable('movies');
        await queryRunner.dropTable('screens');
        await queryRunner.dropTable('seat_types');
        await queryRunner.dropTable('cinemas');
        await queryRunner.dropTable('genres');
    }
}
