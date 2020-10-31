import React from 'react';
import { useDrag } from 'react-dnd';
import { FormElement } from '../model';
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

type Props = {
  formElement: FormElement;
  onClick?: () => void;
};

export const DraggableField: React.FC<Props> = (props: Props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...props.formElement, type: 'draggable-field' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <ListItem
      ref={drag}
      style={{ opacity: isDragging ? 0.8 : 1, cursor: 'pointer' }}
      onClick={props.onClick}
    >
      <ListItemAvatar>{props.formElement.icon}</ListItemAvatar>
      <ListItemText
        primary={props.formElement.label}
        secondary={props.formElement.description}
      />
    </ListItem>
  );
};
