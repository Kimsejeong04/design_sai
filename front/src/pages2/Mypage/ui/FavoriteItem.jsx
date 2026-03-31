// FavoriteItem.jsx
import React from "react";
import PropTypes from "prop-types";
import "./FavoriteItem.css";

const FavoriteItem = ({
  favorite,
  title,
  amount,
  deadline,
  description,
  categoryTags = [],
  style:itemStyle,
  }) => {
    const imageUrl = favorite.image1Url || favorite.imageUrl || '';
  return (
    <div className="favorite-item">
     {imageUrl && (
        <img
          src={imageUrl}
          
          className="favorite-item__image"
        />
      )}
      <div className="favorite-item__info">
        <h3 className="favorite-item__title">{title}</h3>
        <p className="favorite-item__amount">금액: {amount}원</p>
        <p className="favorite-item__deadline">마감일: {deadline}</p>
        <p className="favorite-item__description">{description}</p>
        {categoryTags.length > 0 && (
          <p className="favorite-item__tags">
            카테고리: {categoryTags.join(', ')}
          </p>
        )}
        {itemStyle && (
          <p className="favorite-item__style">
            스타일: {itemStyle}
          </p>
        )}
      </div>
    </div>
  );
};

FavoriteItem.propTypes = {
  favorite: PropTypes.shape({
    requestId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    hashtags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

FavoriteItem.defaultProps = {
  title: "",
  children: null,
};

export default FavoriteItem;
