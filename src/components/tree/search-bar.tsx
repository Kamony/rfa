import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Popper from '@material-ui/core/Popper';
import {
  Box,
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import { BackspaceOutlined } from '@material-ui/icons';

type SearchStateType = {
  label: boolean;
  content: boolean;
};

type Props = {
  onSearch: (query: string | undefined) => void;
  searchIn: SearchStateType;
  onSearchInChange: ({ label, content }: SearchStateType) => void;
  matchPartial: boolean;
  onMatchPartial: (match: boolean) => void;
};

export const SearchBar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearchInChange({
      ...props.searchIn,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMatchingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onMatchPartial(event.target.checked);
  };

  const handleOpenMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    },
    [anchorEl]
  );

  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = open ? 'simple-popper' : undefined;

  const handleSubmit = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      props.onSearch(inputRef.current?.value);
    },
    [props]
  );
  console.log(open);
  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <IconButton
        className={classes.iconButton}
        aria-label="menu"
        onClick={handleOpenMenu}
      >
        <MenuIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={'bottom-start'}
      >
        {/*<ClickAwayListener onClickAway={handleCloseMenu}>*/}
        <Paper>
          <Box p={1}>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.searchIn.label}
                      onChange={handleChange}
                      name="label"
                    />
                  }
                  label="Search in labels"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.searchIn.content}
                      onChange={handleChange}
                      name="content"
                    />
                  }
                  label="Search in content"
                />
              </FormGroup>
            </FormControl>
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.matchPartial}
                  onChange={handleMatchingChange}
                  name="partial"
                />
              }
              label="Match partial results"
            />
          </Box>
        </Paper>
        {/*</ClickAwayListener>*/}
      </Popper>
      <InputBase
        className={classes.input}
        name={'search'}
        placeholder="Search Tree"
        inputProps={{ 'aria-label': 'search tree node' }}
        inputRef={inputRef}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        onClick={() => props.onSearch(undefined)}
        className={classes.iconButton}
        aria-label="clear"
      >
        <BackspaceOutlined />
      </IconButton>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);
