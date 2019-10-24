import React from "react";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;
    return (
      <div
        className="container-fluid align-items-center ml-3 mt-2"
        style={{ width: "660px" }}
      >
        <div className="movie-title">
          <h1 className="value">{movie.Title}</h1>
        </div>
        <img
          className="movie-poster"
          src="http://via.placeholder.com/640x360"
        />
        <div className="movie-description">
          <div className="mt-1 mb-3">{movie.Description}</div>
        </div>
        <div className="movie-genre">
          <div className="value">Genre: {movie.Genre.Name}</div>
        </div>
        <div className="movie-director">
          <div className="value">Director: {movie.Director.Name}</div>
        </div>
        <button
          className="btn btn-outline-primary text-uppercase mt-2"
          onClick={() => onClick()}
        >
          Back to Movies
        </button>
      </div>
    );
  }
}
