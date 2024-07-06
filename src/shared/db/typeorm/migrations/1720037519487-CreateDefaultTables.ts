import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDefaultTables1720037519487 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now());`
        )   
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            url VARCHAR(255) NOT NULL,
            views INTEGER DEFAULT 0,
            cat_name VARCHAR(255) NOT NULL,
            cat_age VARCHAR(255) NOT NULL,
            cat_breed VARCHAR(255) NOT NULL,
            cat_weight VARCHAR(255) NOT NULL,
            author_id INTEGER,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now(),
            CONSTRAINT fk_author
                FOREIGN KEY(author_id) 
                REFERENCES users(id)
            );`
        )   
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            author_id INTEGER,
            post_id INTEGER,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now(),
            CONSTRAINT fk_author
                FOREIGN KEY(author_id) 
                REFERENCES users(id),
            CONSTRAINT fk_post
                FOREIGN KEY(post_id) 
                REFERENCES posts(id)
            );`
        )   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE comments`);
        await queryRunner.query(`DROP TABLE posts`);
        await queryRunner.query(`DROP TABLE users`);
    }

}
