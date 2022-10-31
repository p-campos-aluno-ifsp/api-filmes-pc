const Movie = require("../models/moviesModel");
const Joi = require("joi");
const app = require("../../config/server");
const { render } = require("../../config/server");

const schema = Joi.object().keys({
  name: Joi.string().required().min(1).max(50),
  director: Joi.string().required().min(1).max(50),
  link: Joi.string().required().min(1).max(150),
});

module.exports = class Movies {
  static async GetMovies(req, res, next) {
    try {
      const movies = await Movie.getAllmovies();
      if (!movies) {
        res.status(404).json("Nao existe filme cadastrado");
        return;
      }
      movies.forEach((movie) => {
        console.log("retorno do bacon de dados (controler)", movie.name);
      });
      res.status(200).json(movies);
    } catch (error) {
      console.log("get all erorr", error);
      res.status(500).json({ error: error });
    }
  }

  /*  static async addMovie(req, res, next) {
    console.log("[Add Movie Controller]", req.body);
    try {
      const addedMovie = await Movie.addMovie(req.body);
      res.status(200).json(addedMovie);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }*/

  static async addMovie(req, res, next) {
    console.log("[Add Movie Controller XPTO]", req.body);
    const { error, value } = schema.validate(req.body);
    // console.log(`[Controller add movie error: ] ${value} - ${error.details}`);
    if (error) {
      const result = {
        msg: "Filme não incluído. Campos não foram preenchidos corretamente.",
        error: error.details,
      };
      res.status(404).json(result);
      return;
    }
    try {
      const addedMovie = await Movie.addMovie(req.body);
      res.status(200).json(addedMovie);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async delMovie(req, res, next) {
    console.log("DEL movie controler. ID ->", req.params);

    let idMovie = req.params.id;

     Movie.delMovie(idMovie);

     res.status(200).json({ oi: idMovie });
  }
};
