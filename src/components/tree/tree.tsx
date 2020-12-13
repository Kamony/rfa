import React from 'react';
import { TreeNode, TreeNodeType } from './tree-node/tree-node';
import {
  Container,
  CssBaseline,
  Divider,
  LinearProgress,
  Theme,
  ThemeOptions,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { SearchBar } from './search-bar';

export type TreeProps = {
  theme?: ThemeOptions;
  searchable?: boolean;
  onNodeSelect?: (node: TreeNodeType) => void;
  node: TreeNodeType;
};

export const Tree = ({ theme, node, searchable, onNodeSelect }: TreeProps) => {
  const Theme: Theme = React.useMemo(
    () =>
      createMuiTheme({
        ...theme,
      }),
    []
  );

  const [query, setQuery] = React.useState<string | undefined>('');
  const [tree, setTree] = React.useState<TreeNodeType[] | undefined | null>([
    Node,
  ]);
  const [searchIn, setSearchIn] = React.useState({
    content: false,
    label: true,
  });
  const [matchPartial, setMatchPartial] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!query) {
      setQuery('');
      return setTree([node]);
    }
    setLoading(true);
    const result = searchForMany(
      node,
      query,
      [
        ...(searchIn.content ? ['content'] : []),
        ...(searchIn.label ? ['label'] : []),
      ],
      matchPartial
    );
    setTree(result);
    setLoading(false);
  }, [matchPartial, query, searchIn.content, searchIn.label]);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container>
        <div style={{ border: '1px transparent solid' }}>
          {searchable && (
            <SearchBar
              onSearch={setQuery}
              searchIn={searchIn}
              onSearchInChange={setSearchIn}
              matchPartial={matchPartial}
              onMatchPartial={setMatchPartial}
            />
          )}
          {isLoading && <LinearProgress />}
          {tree && tree.length ? (
            tree.map((node, i) => (
              <div key={i}>
                <TreeNode
                  node={node}
                  isCollapsed={true}
                  onSelect={onNodeSelect}
                />
                <Divider />
              </div>
            ))
          ) : (
            <Typography>No results match query.</Typography>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
};

const searchForMany = (
  rootNode: TreeNodeType,
  query: string,
  searchIn: string[],
  partialResults: boolean
): TreeNodeType[] | null => {
  console.log('searching for ', query, 'in fields', searchIn);

  const queue = [rootNode];
  const results = [];

  while (queue.length) {
    const node = queue.shift();

    if (node?.descendents?.length) {
      queue.push(...node.descendents);
    }

    if (
      searchIn.includes('label') &&
      (node?.name === query || (partialResults && node?.name.includes(query)))
    ) {
      results.push(node);
    } else {
      if (searchIn.includes('content')) {
        if (!node?.data) {
          continue;
        }
        const res = Object.values(node.data).find(
          (value) =>
            value.toString().toLowerCase() === query.toLowerCase() ||
            (partialResults && value.includes(query))
        );
        if (res) {
          results.push(node);
        }
      }
    }
  }

  return results.length ? results : null;
};
