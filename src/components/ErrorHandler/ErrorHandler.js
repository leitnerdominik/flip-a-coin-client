import React, { Fragment } from 'react';

import Button from '../Button/Button';

import classes from './ErrorHandler.module.css';

const errorHandler = ({ error, close }) => (
  <Fragment>
    {error && (
      <div className={classes.ErrorHandler}>
        <header>
          <h2>An Error occurred</h2>
        </header>
        <p>{error.message}</p>
        <Button type="button" clicked={close} design="Danger">
          close
        </Button>
      </div>
    )}
  </Fragment>
);

export default errorHandler;
