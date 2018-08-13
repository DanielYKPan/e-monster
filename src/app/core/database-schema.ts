/**
 * database-schema
 */
import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
    version: 1,
    name: 'e-monster',
    stores: {
        books: {
            autoIncrement: true,
            primaryKey: 'id',
        },
        movies: {
            autoIncrement: true,
            primaryKey: 'id',
        },
        tvs: {
            autoIncrement: true,
            primaryKey: 'id',
        },
        albums: {
            autoIncrement: true,
            primaryKey: 'id',
        },
    },
};

