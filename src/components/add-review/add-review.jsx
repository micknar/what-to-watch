import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import filmProp from "../../const/film.prop";
import UserBlock from "../user-block/user-block";
import PageHeaderLogo from "../page-header-logo/page-header-logo";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import AddReviewForm from "../add-review-form/add-review-form";
import withUserReview from "../../hocs/with-user-review/with-user-review";

const AddReviewFormWrapped = withUserReview(AddReviewForm);

const AddReview = (props) => {
  const {films, currentFilmId} = props;
  const currentFilm = films.find((film) => film.id === currentFilmId);
  const {id, backgroundImage, name, posterImage, backgroundColor} = currentFilm;

  return (
    <section className="movie-card movie-card--full" style={{backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <PageHeaderLogo />
          <Breadcrumbs film={currentFilm} />
          <UserBlock />
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewFormWrapped
          filmId={id}
          backgroundColor={backgroundColor}
        />
      </div>
    </section>
  );
};

AddReview.propTypes = {
  currentFilmId: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(filmProp).isRequired,
};

const mapStateToProps = ({APP_STATE}) => ({
  films: APP_STATE.films,
});

export {AddReview};
export default connect(mapStateToProps)(AddReview);
