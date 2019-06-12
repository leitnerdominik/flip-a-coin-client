import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const modal = ({ children, show }) =>
  ReactDOM.createPortal(
    <Fragment>
      <div
        style={{
          top: show ? '0' : null,
        }}
        className={classes.Modal}
      >
        {children}
      </div>
    </Fragment>,
    document.getElementById('modal-root'),
  );

export default modal;
