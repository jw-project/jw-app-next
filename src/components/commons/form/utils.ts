import type { SelectOptionsType } from './select';

export const setVoidOptionWhenNew = (
  options: SelectOptionsType[],
  id: string,
): SelectOptionsType[] => {
  if (['new', 'loading'].includes(id)) {
    return [
      { label: '', value: '', disabled: true, selected: true },
      ...options,
    ];
  }

  return options;
};
