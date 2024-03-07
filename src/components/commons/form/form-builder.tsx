import type { HTMLAttributes } from 'react';

import type { convertHtmlToReact } from '@hedgedoc/html-to-react';

import { Button } from '../button';
import { Col, Grid, type ColProps, type GridProps } from '../grid';
import { Subtitle } from '../typography';
import { Input } from './input';
import { Select, type SelectOptionsType } from './select';
import { TextArea } from './text-area';

type InputTypeAttribute =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'hidden'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

type CommonField = {
  name: string;
  label: ReturnType<typeof convertHtmlToReact>;
  visible?: boolean;
  colSpan?: ColProps['colSpan'];
  disabled?: boolean;
  max?: string;
  min?: string;
};

type TextField = CommonField & {
  type: InputTypeAttribute;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
};

type TextAreaField = CommonField & {
  type: 'textarea';
};

type SelectField = CommonField & {
  type: 'select';
  options: Array<SelectOptionsType>;
};

type SubtitleField = CommonField & {
  type: 'subtitle';
};

type SubmitButton = CommonField & {
  type: 'submit';
};

type AllFields =
  | TextField
  | TextAreaField
  | SelectField
  | SubtitleField
  | SubmitButton;

const isTextAreaField = (field: AllFields): field is TextAreaField =>
  field.type === 'textarea';

const isSelectField = (field: AllFields): field is SelectField =>
  field.type === 'select';

const isSubtitleField = (field: AllFields): field is SubtitleField =>
  field.type === 'subtitle';

const isSubmitButton = (field: AllFields): field is SubmitButton =>
  field.type === 'submit';

export type FormBuilderProps = {
  fields: Array<AllFields>;
  cols?: GridProps['cols'];
  disabled?: boolean;
};

export const FormBuilder = ({
  fields,
  cols = 2,
  disabled = false,
}: FormBuilderProps) => {
  return (
    <Grid cols={cols}>
      {fields
        .filter(({ visible }) => visible !== false)
        .map((field) => {
          if (isSelectField(field)) {
            return (
              <Col colSpan={field.colSpan} key={field.name}>
                <Select
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  disabled={disabled || field.disabled}
                />
              </Col>
            );
          }

          if (isTextAreaField(field)) {
            return (
              <Col colSpan={field.colSpan} key={field.name}>
                <TextArea
                  name={field.name}
                  label={field.label}
                  disabled={disabled || field.disabled}
                />
              </Col>
            );
          }

          if (isSubtitleField(field)) {
            return (
              <Col colSpan={field.colSpan || 2} key={field.name}>
                <Subtitle>{field.label}</Subtitle>
              </Col>
            );
          }

          if (isSubmitButton(field)) {
            return (
              <Col colSpan={field.colSpan} key={field.name}>
                <Button type="submit" disabled={disabled || field.disabled}>
                  {field.label}
                </Button>
              </Col>
            );
          }

          return (
            <Col colSpan={field.colSpan} key={field.name}>
              <Input
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                disabled={disabled || field.disabled}
                max={field.max}
                min={field.min}
              />
            </Col>
          );
        })}
    </Grid>
  );
};
