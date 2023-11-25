import React from 'react';

import './Preloader.css';

const Preloader: React.FunctionComponent = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
export default Preloader;
