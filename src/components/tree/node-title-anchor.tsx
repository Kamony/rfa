import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

type Props = {
  visible: boolean;
  title: string;
  onClick?: () => void;
};

export const NodeTitleAnchor = ({ visible, title, onClick }: Props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <Typography
        color={'textSecondary'}
        className={classes.nodeTitle}
        variant={'caption'}
        style={{
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        {title}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { position: 'sticky', top: 0, zIndex: 15, cursor: 'pointer' },
    nodeTitle: {
      border: `1px ${theme.palette.primary.light} solid`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
      position: 'absolute',
      height: 'max-content',
      writingMode: 'vertical-rl',
      padding: theme.spacing(0.5, 0.25, 0.5, 0.25),
      textShadow: `0px 0px 1px ${theme.palette.primary.light}`,
      '&:hover': {
        border: `1px ${theme.palette.primary.main} solid`,
        textShadow: `0px 0px 1px ${theme.palette.primary.main}`,
      },
    },
  })
);
