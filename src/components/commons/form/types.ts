import type { convertHtmlToReact } from '@hedgedoc/html-to-react';

export type InputType = {
  name: string;
  label: ReturnType<typeof convertHtmlToReact>;
};
