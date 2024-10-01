'use client';

import { AgGridReact, type AgGridReactProps } from 'ag-grid-react';

import { saveRecords } from '~/actions/people/publishers/records/save';
import type { PublisherRecordsEntity } from '~/entities/publisher';
import { useTheme } from '~/hooks/use-theme';
import { useTranslation } from '~/hooks/use-translation';

import { YearSelect } from './year-select';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

export function RecordsGrid({
  yearOptions,
  records,
}: {
  yearOptions: { selected: number; years: Array<number> };
  records: Array<PublisherRecordsEntity>;
}) {
  const { theme } = useTheme();
  const agGridTheme =
    theme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';
  const { translate } = useTranslation('routes.people.publishers.records-grid');
  const rowData = records.map((record) => ({
    ...record,
    'month-indicative': `${record.month}-${record.year}`,
  }));

  const commonProps = {
    sortable: false,
    resizable: false,
    editable: true,
  };

  const colDefs: AgGridReactProps['columnDefs'] = [
    {
      field: 'month-indicative',
      headerName: String(translate('month-indicative')),
      ...commonProps,
      editable: false,
    },
    {
      field: 'shared',
      headerName: String(translate('shared')),
      ...commonProps,
    },
    {
      field: 'studies',
      headerName: String(translate('studies')),
      cellEditor: 'agNumberCellEditor',
      ...commonProps,
    },
    {
      field: 'auxiliaryPioneer',
      headerName: String(translate('auxiliary-pioneer')),
      ...commonProps,
    },
    {
      field: 'hours',
      headerName: String(translate('hours')),
      cellEditor: 'agNumberCellEditor',
      ...commonProps,
    },
    {
      field: 'credits',
      headerName: String(translate('credits')),
      cellEditor: 'agNumberCellEditor',
      ...commonProps,
    },
    { field: 'late', headerName: String(translate('late')), ...commonProps },
    {
      field: 'remarks',
      headerName: String(translate('remarks')),
      ...commonProps,
    },
  ];

  function onBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function onCellEditingStarted() {
    window.addEventListener('beforeunload', onBeforeUnload);
  }

  function onCellEditingStopped() {
    window.removeEventListener('beforeunload', onBeforeUnload);
  }

  const onSubmit = ({ data }: { data: PublisherRecordsEntity }) => {
    saveRecords(data);
  };

  return (
    <div className="h-full">
      <YearSelect yearOptions={yearOptions} />
      <div
        className={`${agGridTheme}`}
        style={{ height: 'calc(100% - 102px)' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          suppressMovableColumns
          stopEditingWhenCellsLoseFocus
          autoSizeStrategy={{ type: 'fitCellContents' }}
          onCellValueChanged={onSubmit}
          onCellEditingStarted={onCellEditingStarted}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
}
