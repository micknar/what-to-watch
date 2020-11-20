import React from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card";
import VideoPlayer from "../video-player/video-player";
import withVideo from "../../hocs/with-video/with-video";

const VideoPlayerWrapped = withVideo(VideoPlayer);

const FilmsList = (props) => {
  const {films, onFilmCardClick, activeCard, handleActiveCard, handleMouseLeave} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => {
        return (
          <FilmCard
            key={film.id}
            id={film.id}
            name={film.name}
            posterImage={film.posterImage}
            onFilmCardHover={handleActiveCard}
            onFilmCardLeave={handleMouseLeave}
            onFilmCardClick={onFilmCardClick}
          >
            <VideoPlayerWrapped
              muted={true}
              videoLink={film.videoLink}
              posterImage={film.posterImage}
              width="280"
              heigth="175"
              isPlaying={activeCard === film.id}
            />
          </FilmCard>
        );
      })}
    </div>
  );
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  onFilmCardClick: PropTypes.func.isRequired,
  activeCard: PropTypes.number.isRequired,
  handleActiveCard: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
};

export default FilmsList;
