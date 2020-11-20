import React, {PureComponent} from "react";
import {FilmPageNav} from "../../mocks/const.js";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.handleActiveTab = this.handleActiveTab.bind(this);

      this.state = {
        filmTab: FilmPageNav.OVERVIEW,
      };
    }

    handleActiveTab(value) {
      this.setState({
        filmTab: value,
      });
    }

    render() {
      const activeTab = this.state.filmTab;

      return (
        <Component {...this.props}
          activeTab={activeTab}
          handleActiveTab={this.handleActiveTab}
        />
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
