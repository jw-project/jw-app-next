'use client';

import { saveEvent } from '~/actions/congregation/events/save';
import { eventFormSchema } from '~/actions/congregation/events/validations';
import { Form } from '~/components/commons/form/form';
import type { EntityForm } from '~/components/commons/table/types';
import { eventOptions, type EventEntity } from '~/entities/event';
import { useTranslation } from '~/hooks/use-translation';
import { useUser } from '~/hooks/use-user';
import { useValidatePermissions } from '~/hooks/use-validate-permissions';

export const EventForm = ({ id, data, disabled }: EntityForm<EventEntity>) => {
  const { permissions } = useUser();
  const { translate } = useTranslation('routes.congregation.events.form');
  const { canWrite } = useValidatePermissions(permissions, 'events');

  return (
    <Form
      key={id}
      schema={eventFormSchema}
      defaultValues={data}
      serverAction={saveEvent}
      disabled={disabled}
      builder={{
        disabled: !canWrite,
        cols: 1,
        fields: [
          {
            name: 'type',
            label: translate('type'),
            type: 'select',
            options: eventOptions(),
          },
          {
            name: 'name',
            label: translate('name'),
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
            label: translate('start_date'),
            type: 'date',
          },
          {
            name: 'startTime',
            label: translate('start_time'),
            type: 'time',
          },
          {
            name: 'endDate',
            label: translate('end_date'),
            type: 'date',
          },
          {
            name: 'endTime',
            label: translate('end_time'),
            type: 'time',
          },
        ],
      }}
    />
  );
};
