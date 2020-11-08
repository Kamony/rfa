import React from 'react';
import type { FieldValues } from 'react-hook-form';
import type { Theme, ThemeOptions } from '@material-ui/core';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import type { IState } from '../store/store';
import { ExportedDataType } from '../hooks/useDataExporter';
import { useRfaDataConverter } from '../hooks/useRfaDataConverter';
import { FormRendererForm } from './form-renderer-form';

type Props = {
  data: IState | ExportedDataType;
  onSubmit: (data: FieldValues) => void;
  theme?: ThemeOptions;
  fields?: React.FC<any>[]; // any additional fields
};

export const FormRenderer = ({ data, onSubmit, theme, fields }: Props) => {
  const {
    handlers: { registerComponents },
  } = useRfaDataConverter();

  // register any additional form fields
  React.useEffect(() => {
    if (!fields) {
      return;
    }
    registerComponents(fields);
  }, [fields]);

  const Theme: Theme = React.useMemo(
    () =>
      createMuiTheme({
        ...theme,
      }),
    []
  );

  const {
    handlers: { dataToStore },
    state: { isExportedJson },
  } = useRfaDataConverter();

  //convert data to correct type before render
  const FormRendererData = React.useMemo(
    () => (isExportedJson(data) ? dataToStore(data) : data),
    [data, dataToStore]
  );

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container maxWidth={'xl'}>
        {FormRendererData && (
          <FormRendererForm data={FormRendererData} onSubmit={onSubmit} />
        )}
      </Container>
    </ThemeProvider>
  );
};
