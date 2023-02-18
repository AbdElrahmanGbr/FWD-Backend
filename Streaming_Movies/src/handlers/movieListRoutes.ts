import express, { Request, Response } from "express";
import { MovieList, MovieListModel } from "../models/movieListModel";

const store = new MovieListModel();

const index = async (req: Request, res: Response) => {
  try {
    const movielist = await store.index();
    res.status(200).json(movielist);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const movielist = await store.show(parseInt(req.params.id));
    res.status(200).json(movielist);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const movielist: MovieList = {
    id: req.body.id,
    userListID: req.body.userListID,
    movieID: req.body.movie,
    name: req.body.name,
  };
  try {
    const movies = await store.create(movielist);
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err);
  }
};

const Delete = async (req: Request, res: Response) => {
  try {
    const movies = await store.delete(parseInt(req.params.id));
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const movielist: MovieList = {
    id: req.body.id,
    userListID: req.body.userListID,
    movieID: req.body.movie,
    name: req.body.name,
  };
  try {
    const movies = await store.update(parseInt(req.params.id), movielist);
    res.status(200).json(movies);
  } catch (err) {
    res.status(200).json(err);
  }
};

const movieListRoutes = (app: express.Application) => {
  app.get("/movielist", index);
  app.post("/movielist/", create);
  app.get("movielist/:id", show);
  app.patch("movielist/:id", update);
  app.delete("movielist/:id", Delete);
};

export default movieListRoutes;
