const client = require("../../config/dbConnection");

const { ObjectId } = require("mongodb");

module.exports = class MoviesModel {
  static async getAllmovies() {
    const cursor = await client.db("dsw").collection("movies").find();
    const movies = await cursor.toArray();
    return movies;
  }

  static async addMovie(data) {
    console.log(`[Movie Model - Add Movie] ${data}`);
    try {
      const newMovie = {
        name: data.name,
        director: data.director,
        link: data.link,
        date: new Date(),
      };
      const addedMovie = await client
        .db("dsw")
        .collection("movies")
        .insertOne(newMovie);
      console.log(
        `New movie inserted with the following id ${addedMovie.insertedId}`
      );
      return addedMovie;
    } catch (error) {
      console.log(`[movieService] Error: ${error}`);
    }
  }

  static async delMovie(id) {
    //  console.log("moviesModel DEL for id ->", id);

    let obj = new ObjectId(id);

    client.db("dsw").collection("movies").deleteOne({ _id: obj });
  }
};
