import React from 'react';
import { withRouter } from 'react-router-dom';

import './collection-preview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items, routeName, history, match }) => {
  return (
    <div className='collection-preview'>
      <h1 className='title' onClick={() => history.push(`${match.url}/${routeName}`)}>{title.toUpperCase()}</h1>
      <div className='preview'>
        {items
          .filter((item, index) => index < 4) // Only first 4 items shown, bad practice for large `items` list
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default withRouter(CollectionPreview);
