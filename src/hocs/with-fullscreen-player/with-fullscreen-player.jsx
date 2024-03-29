import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const withFullscreenPlayer = (Component) => {
  class WithFullscreenPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._onPlayBtnClickHandler = this._onPlayBtnClickHandler.bind(this);
      this._onFullscreenBtnClickHandler = this._onFullscreenBtnClickHandler.bind(this);

      this._videoRef = createRef();

      this.state = {
        isPlaying: true,
        isLoading: true,
        duration: 0,
        progress: 0,
      };
    }

    componentDidMount() {
      this._videoRef.current.oncanplay = () => {
        this.setState({
          isLoading: false,
          duration: Math.floor(this._videoRef.current.duration),
        });
      };

      this._videoRef.current.ontimeupdate = () => {
        this.setState({
          isLoading: false,
          progress: Math.floor(this._videoRef.current.currentTime),
        });
      };
    }

    componentDidUpdate() {
      if (this.state.isPlaying) {
        this._videoRef.current.play();
      } else {
        this._videoRef.current.pause();
      }
    }

    componentWillUnmount() {
      this._videoRef.current.oncanplay = null;
      this._videoRef.current.ontimeupdate = null;
    }

    _onPlayBtnClickHandler() {
      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }

    _onFullscreenBtnClickHandler() {
      this._videoRef.current.requestFullscreen();
    }

    render() {
      const {isPlaying, isLoading, duration, progress} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          isLoading={isLoading}
          duration={duration}
          progress={progress}
          onPlayBtnClick={this._onPlayBtnClickHandler}
          onFullscreenBtnClick={this._onFullscreenBtnClickHandler}
          renderPlayer={(film) => {
            return (
              <video
                className="player__video"
                ref={this._videoRef}
                src={film.videoLink}
                image={film.previewImage}
              ></video>
            );
          }}
        />
      );
    }
  }

  WithFullscreenPlayer.propTypes = {
    currentFilmId: PropTypes.number.isRequired,
  };

  return WithFullscreenPlayer;
};

export default withFullscreenPlayer;
