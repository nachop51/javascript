CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movie (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  director VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  poster TEXT,
  rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
  movie_id BINARY(16) NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
);

INSERT INTO genre (name) VALUES
  ('drama'), ('action'), ('crime'), ('adventure'), ('comedy'), ('fantasy'), ('horror'), ('mystery'), ('romance'), ('thriller'), ('western');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://www.imdb.com/title/tt0111161/mediaviewer/rm4209565696', 9.3),
(UUID_TO_BIN(UUID()), 'The Godfather', 1972, 'Francis Ford Coppola', 175, 'https://www.imdb.com/title/tt0068646/mediaviewer/rm3877282560', 9.2),
(UUID_TO_BIN(UUID()), 'The Godfather: Part II', 1974, 'Francis Ford Coppola', 202, 'https://www.imdb.com/title/tt0071562/mediaviewer/rm3894433280', 9.0);

INSERT INTO movie_genres (movie_id, genre_id) VALUES
  ((SELECT id FROM movie WHERE title = 'The Godfather'), (SELECT id FROM genre WHERE name = 'drama')),
  ((SELECT id FROM movie WHERE title = 'The Godfather'), (SELECT id FROM genre WHERE name = 'crime')),
  ((SELECT id FROM movie WHERE title = 'The Godfather'), (SELECT id FROM genre WHERE name = 'thriller')),
  ((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'drama')),
  ((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'crime')),
  ((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'thriller')),
  ((SELECT id FROM movie WHERE title = 'The Godfather: Part II'), (SELECT id FROM genre WHERE name = 'drama')),
  ((SELECT id FROM movie WHERE title = 'The Godfather: Part II'), (SELECT id FROM genre WHERE name = 'crime')),
  ((SELECT id FROM movie WHERE title = 'The Godfather: Part II'), (SELECT id FROM genre WHERE name = 'thriller'));

SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movie;
