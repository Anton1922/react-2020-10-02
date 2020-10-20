import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { tabsSelector } from '../../redux/selectors';

const Restaurants = ({ tabs }) => {
  tabs = tabs.map((restaurant) => ({
    title: restaurant.name,
    content: <Restaurant restaurant={restaurant} />,
  }));

  return <Tabs tabs={tabs} />;
};

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default connect((state) => ({
  tabs: tabsSelector(state),
}))(Restaurants);
