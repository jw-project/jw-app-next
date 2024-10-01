'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Select } from '~/components/commons/form/select';
import { useTranslation } from '~/hooks/use-translation';

export const YearSelect = ({
  yearOptions,
}: {
  yearOptions: { selected: number; years: Array<number> };
}) => {
  const { translate } = useTranslation('routes.people.publishers.records-grid');
  const methods = useForm({
    defaultValues: { year: String(yearOptions.selected) },
  });

  return (
    <div className="w-1/3 pt-4 pl-4">
      <FormProvider {...methods}>
        <Select
          label={translate('year')}
          name="year"
          options={yearOptions.years.map((year) => ({
            label: String(year),
            value: String(year),
          }))}
        />
      </FormProvider>
    </div>
  );
};
