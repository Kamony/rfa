import React from 'react';
import { useDrag } from 'react-dnd';
import { FormElement } from '../model';
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type Props = {
  formElement: FormElement;
  onClick?: () => void;

  children?: never;
};

export const DraggableField = (props: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...props.formElement, type: 'draggable-field' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <ListItem
      ref={drag}
      style={{ opacity: isDragging ? 0.8 : 1, cursor: 'pointer' }}
      onClick={props.onClick}
      divider
    >
      <ListItemAvatar>{props.formElement.icon}</ListItemAvatar>
      {isDesktop && (
        <ListItemText
          primary={props.formElement.label}
          secondary={props.formElement.description}
        />
      )}
    </ListItem>
  );
};
