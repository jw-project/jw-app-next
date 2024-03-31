'use client';
'use cliente';

import { useState } from 'react';

// import Commons and hooks
import { Form } from '~/components/commons/form/form';
import type { EntityForm } from '~/components/commons/table/types';
import { useUser } from '~/hooks/use-user';
import { useTranslation } from '~/hooks/use-translation';
import { useValidatePermissions } from '~/hooks/use-validate-permissions';
// end import Commons and hooks

import {
  import type { EntityForm } from '~/components/commons/table/types';
  informationboardOptions,
  type InformationBoardEntity,
  } from '~/entities/informationboard';
  
export const InformationBoardForm = ({
  id,
  data,
  disabled,
}: EntityForm<InformationBoardEntity>) => {
  const { permissions } = useUser();
  const { translate } = useTranslation(
    'routes.congregation.informationboard.form',
  );
  const { canWrite } = useValidatePermissions(permissions, 'informationboard');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  return (
    <Form
      key={id}
      schema={informationboardFormSchema}
      defaultValues={data}
      serverAction={saveInformationBoard}
      disabled={disabled}
      onFormStatusChange={(_, values) => {
        setDateStart((c) => values.startDate || c);
        setDateEnd((c) => values.endDate || c);
      }}
      builder={{
        disabled: !canWrite,
        cols: 1,
        fields: [
          {
            name: 'type',
            label: translate('type'),
            type: 'select',
            options: informationboardOptions(),
          },
          {
            name: 'title',
            label: translate('title'),
            type: 'text',
          },
          {
            name: 'description',
            label: translate('description'),
            type: 'textarea',
          },
          {
            name: 'link',
            label: translate('link'),
            type: 'text',
          },
          {
            name: 'startDate',
            label: translate('start-date'),
            type: 'date',
            max: dateEnd,
          },
          {
            name: 'endDate',
            label: translate('end-date'),
            type: 'date',
            min: dateStart,
          },
        ],
      }}
    />
  );
};
