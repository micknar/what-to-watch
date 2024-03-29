import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card";
import {noop, films} from "../../test-mocks";

configure({adapter: new Adapter()});

const {id, name, previewImage, previewVideoLink} = films[0];

describe(`FilmCard callbacks should be called`, () => {
  it(`Click by Card calls callback`, () => {
    const onCardClickHandler = jest.fn();

    const wrapper = shallow(
        <FilmCard
          id={id}
          name={name}
          previewImage={previewImage}
          previewVideoLink={previewVideoLink}
          onCardClick={onCardClickHandler}
          onCardMouseOver={noop}
          onCardMouseOut={noop}
          isActive={false}
        />
    );

    const node = wrapper.find(`.small-movie-card`);
    node.simulate(`click`);
    expect(onCardClickHandler).toHaveBeenCalledTimes(1);
  });

  it(`MouseOver on Card calls callback`, () => {
    const onCardMouseOverHandler = jest.fn();

    const wrapper = shallow(
        <FilmCard
          id={id}
          name={name}
          previewImage={previewImage}
          previewVideoLink={previewVideoLink}
          onCardClick={noop}
          onCardMouseOver={onCardMouseOverHandler}
          onCardMouseOut={noop}
          isActive={false}
        />
    );

    const node = wrapper.find(`.small-movie-card`);
    node.simulate(`mouseover`);
    expect(onCardMouseOverHandler).toHaveBeenCalledTimes(1);
  });

  it(`MouseOut on Card calls callback`, () => {
    const onCardMouseOutHandler = jest.fn();

    const wrapper = shallow(
        <FilmCard
          id={id}
          name={name}
          previewImage={previewImage}
          previewVideoLink={previewVideoLink}
          onCardClick={noop}
          onCardMouseOver={noop}
          onCardMouseOut={onCardMouseOutHandler}
          isActive={true}
        />
    );

    const node = wrapper.find(`.small-movie-card`);
    node.simulate(`mouseout`);
    expect(onCardMouseOutHandler).toHaveBeenCalledTimes(1);
  });
});
