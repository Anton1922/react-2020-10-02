import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';

const Restaurant = ({ restaurant, reviews }) => {
  const { name, menu } = restaurant;

  const restaurantReviews = restaurant.reviews.map((review) => reviews[review]);

  const averageRating = useMemo(() => {
    const total = restaurantReviews.reduce(
      (acc, { rating }) => acc + rating,
      0
    );
    return Math.round(total / restaurantReviews.length);
  }, [restaurantReviews]);

  const tabs = [
    { title: 'Menu', content: <Menu menu={menu} /> },
    {
      title: 'Reviews',
      content: <Reviews restaurantReviews={restaurantReviews} />,
    },
  ];

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <Tabs tabs={tabs} />
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default connect((state) => ({
  reviews: state.reviews,
}))(Restaurant);
/*export default Restaurant;*/
