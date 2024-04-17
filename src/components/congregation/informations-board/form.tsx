'use client';

import { useState } from 'react';

import { saveInformationBoard } from '~/actions/congregation/informations-board/save';
import { informationBoardFormSchema } from '~/actions/congregation/informations-board/validations';
import { Form } from '~/components/commons/form/form';
import type { EntityForm } from '~/components/commons/table/types';
import {
  informationBoardOptions,
  type InformationBoardEntity,
} from '~/entities/information-board';
import { useTranslation } from '~/hooks/use-translation';
import { useUser } from '~/hooks/use-user';
import { useValidatePermissions } from '~/hooks/use-validate-permissions';

export const InformationBoardForm = ({
  id,
  data,
  disabled,
}: EntityForm<InformationBoardEntity>) => {
  const { permissions } = useUser();
  const { translate } = useTranslation(
    'routes.congregation.informationBoard.form',
  );
  const { canWrite } = useValidatePermissions(permissions, 'informationBoard');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  return (
    <Form
      key={id}
      schema={informationBoardFormSchema}
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
            options: informationBoardOptions(),
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
