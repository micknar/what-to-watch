import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withAuthData = (Component) => {
  class WithAuthData extends PureComponent {
    constructor(props) {
      super(props);

      this._onInputChangeHandler = this._onInputChangeHandler.bind(this);
      this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);

      this.state = {
        email: ``,
        password: ``,
        isValidEmail: true,
        isValidPassword: true,
      };
    }

    _onInputChangeHandler(evt) {
      if (evt.target.type === `email`) {
        this.setState({
          email: evt.target.value,
          isValidEmail: evt.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false,
          isValidPassword: this.state.password !== ``,
        });
      } else if (evt.target.type === `password`) {
        this.setState({
          password: evt.target.value,
          isValidPassword: evt.target.value !== ``,
        });
      }
    }

    _onFormSubmitHandler(evt) {
      evt.preventDefault();
    }

    render() {
      const {email, password, isValidEmail, isValidPassword} = this.state;

      return (
        <Component {...this.props}
          email={email}
          password={password}
          isValidEmail={isValidEmail}
          isValidPassword={isValidPassword}
          onInputChange={this._onInputChangeHandler}
          onFormSubmit={this._onFormSubmitHandler}
        />
      );
    }
  }

  WithAuthData.propTypes = {
    onCardClick: PropTypes.func.isRequired,
  };

  return WithAuthData;
};

export default withAuthData;
