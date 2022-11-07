import React from 'react';
import { Puff } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
      <Puff
        height="80"
        width="80"
        radisu={1}
        color="#3f51b5"
        ariaLabel="puff-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
