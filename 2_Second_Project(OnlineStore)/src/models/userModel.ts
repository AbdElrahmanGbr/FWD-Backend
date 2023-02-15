import connection from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstName: string;
  secondName: string;
  userPassword: string;
};

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class userModel {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * from users;';
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get users ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users where id = ($1);';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't find product of id = ${id}. Error: ${error}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (firstName, secondName, userPassword) VALUES ($1, $2, $3) RETURNING *;';
      const hash = bcrypt.hashSync(u.userPassword + pepper, parseInt(saltRounds));
      const result = await connection.query(sql, [u.firstName, u.secondName, hash]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create user of name: ${u.firstName}. Error: ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users where id = ($1);';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete user of id = ${id}. Error: ${error}`);
    }
  }

  //   async authenticate(firstName: string, password: string): Promise<User | null> {
  //     const sql = `SELECT userPassword from users where firstName=${firstName}`;
  //     const result = await connection.query(sql);

  //     if (result.rows.length) {
  //       const user = result.rows[0];
  //       if (bcrypt.compareSync(password + pepper, user.userPassword)) {
  //         return user;
  //       }
  //     }
  //     return null;
  //   }
}