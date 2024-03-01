'use client';

import { saveCongregation } from '~/actions/congregation/save';
import { congregationFormSchema } from '~/actions/congregation/validations';
import { Form } from '~/components/commons/form/form';
import type { CongregationEntity } from '~/entities/congregation';
import { weekOptions } from '~/entities/week';
import { useTranslation } from '~/hooks/use-translation';
import { useUser } from '~/hooks/use-user';

export default function CongregationForm({
  congregation,
}: {
  congregation: CongregationEntity;
}) {
  const { congregationId } = useUser();
  const { translate } = useTranslation('routes.congregation');
  const { translate: commonTranslate } = useTranslation('common');
  const congregationActive = true;
  const canWrite = true;
  const isSaving = false;

  return (
    <Form
      key={congregationId}
      serverAction={saveCongregation}
      schema={congregationFormSchema}
      defaultValues={congregation}
      builder={{
        disabled: !canWrite,
        fields: [
          {
            name: 'id',
            label: translate('id'),
            type: 'text',
            disabled: true,
            visible: congregationActive,
          },
          {
            name: 'name',
            label: translate('name'),
            type: 'text',
            visible: true,
          },
          {
            name: 'number',
            label: translate('number'),
            type: 'number',
            visible: true,
          },
          {
            name: 'address',
            label: translate('address'),
            type: 'textarea',
            visible: congregationActive,
          },
          {
            name: 'midweekMeetingDay',
            label: translate('midweek-meeting-day'),
            type: 'select',
            options: weekOptions(),
            visible: congregationActive,
          },
          {
            name: 'weekendMeetingDay',
            label: translate('weekend-meeting-day'),
            type: 'select',
            options: weekOptions(),
            visible: congregationActive,
          },
          {
            name: 'midweekMeetingTime',
            label: translate('midweek-meeting-time'),
            type: 'time',
            visible: congregationActive,
          },
          {
            name: 'weekendMeetingTime',
            label: translate('weekend-meeting-time'),
            type: 'time',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingSubtitle',
            label: translate('online-meeting-subtitle'),
            type: 'subtitle',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingSoftware',
            label: translate('online-meeting-software'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingId',
            label: translate('online-meeting-id'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingDialNumber',
            label: translate('online-meeting-dial-number'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingPassword',
            label: translate('online-meeting-password'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'onlineMeetingLink',
            label: translate('online-meeting-link'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'circuitSubtitle',
            label: translate('circuit-subtitle'),
            type: 'subtitle',
            visible: congregationActive,
          },
          {
            name: 'circuitName',
            label: translate('circuit-name'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'circuitOverseerName',
            label: translate('circuit-overseer-name'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'circuitOverseerContact',
            label: translate('circuit-overseer-contact'),
            type: 'text',
            visible: congregationActive,
          },
          {
            name: 'submit',
            label: commonTranslate('save'),
            type: 'submit',
            visible: !congregationActive,
            disabled: isSaving,
          },
        ],
      }}
    />
  );
}
