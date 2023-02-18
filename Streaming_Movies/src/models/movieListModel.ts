import client from "../database";

export type MovieList = {
  id: number;
  userListID: number;
  movieID: number;
  name?: string;
};

export type movieUpdate = {
  userID?: number | null;
  movieID?: number | null;
  name?: string | null;
};

export class MovieListModel {
  async index(): Promise<MovieList[]> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM movieList;`;
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Movie List ${err}`);
    }
  }

  async show(id: number): Promise<MovieList[]> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM movieList where is = ($1);`;
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get userList of id ${id} ${err}`);
    }
  }
  async create(ml: MovieList): Promise<MovieList[]> {
    try {
      const conn = await client.connect();
      const query = `INSERT INTO movieList (movieID, userListID) values ($1, $2)`;
      const result = await conn.query(query, [ml.movieID, ml.userListID]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot add movie list ${err}`);
    }
  }
  async delete(id: number): Promise<MovieList[]> {
    try {
      const conn = await client.connect();
      const query = `DELETE FROM movieList where id = ($1)`;
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot delete movie list of id ${id} ${err}`);
    }
  }
  async update(id: number, ml: MovieList): Promise<MovieList[]> {
    try {
      const conn = await client.connect();
      const query = `UPDATE TABLE movieList set movieID= ($1), userListID = ($2) where id = ${id} RETURNING *;`;
      const result = await conn.query(query, [ml.movieID, ml.userListID]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot update movie list of id ${id} ${err}`);
    }
  }
}
