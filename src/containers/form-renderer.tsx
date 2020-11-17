import React from 'react';
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { useRfaDataConverter } from '../hooks/use-rfa-data-converter';
import { FormRendererForm } from './form-renderer-form';

import type { FieldValues } from 'react-hook-form';
import type { Theme, ThemeOptions } from '@material-ui/core';
import type { ExportedSchemaType } from '../hooks/use-data-exporter';
import type { FormSchemaType } from '../store/store';

type FormRendererProps = {
  data: FormSchemaType | ExportedSchemaType;
  onSubmit: (data: FieldValues) => void;
  theme?: ThemeOptions;
  fields?: React.FC<any>[]; // any additional fields

  children?: never;
};

export const FormRenderer = ({
  data,
  onSubmit,
  theme,
  fields,
}: FormRendererProps) => {
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
