const Movies = require("../controllers/moviesController");

module.exports = {
  getMovies: (app) => {
    app.get("/api/filmes", Movies.GetMovies);
  },

  addMovie: (app) => {
    app.post("/api/filmes", Movies.addMovie);
  },



  //EX: http://localhost:3000/api/filmes/636056aca99ad6d9c036942c
  delMovie: (app) => {
    app.delete("/api/filmes/:id", Movies.delMovie);
  },
};
