import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 10000,

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey.A200,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const DropIndicator = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant={'h4'} color={'textSecondary'}>
        Drop here
      </Typography>
    </div>
  );
};
