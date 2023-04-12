import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

function CircularLoader(props: any) {
  const { classes, inline } = props;
  return (
    <div className={classes.parentRoot}>
      {' '}
      <CircularProgress
        size={inline && 22}
        className={classNames({
          [classes.root]: inline === undefined || inline === false,
          [classes.inline]: inline === true,
        })}
        disableShrink
      />{' '}
    </div>
  );
}

const Loader = withStyles((theme) => ({
  parentRoot: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    // background: "rgba(0, 0, 0, 0.3)",
    zIndex: 100000,
  },
  root: {
    position: 'fixed',
    display: 'block',
    zIndex: -1,
    left: '50%',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'grey',
  },
  inline: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'grey',
    width: '15%',
    height: 22,
  },
}))(CircularLoader);

export default Loader;
