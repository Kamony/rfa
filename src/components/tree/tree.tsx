import React from 'react';
import { TreeNode, TreeNodeType } from './tree-node/tree-node';
import {
  Container,
  CssBaseline,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export type TreeProps = {
  theme?: ThemeOptions;
  node: TreeNodeType;
};

export const Tree = ({ theme, node }: TreeProps) => {
  const Theme: Theme = React.useMemo(
    () =>
      createMuiTheme({
        ...theme,
      }),
    []
  );

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container>
        <div style={{ border: '1px transparent solid' }}>
          <TreeNode node={node} />
        </div>
      </Container>
    </ThemeProvider>
  );
};
