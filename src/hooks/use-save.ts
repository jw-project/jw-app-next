import { useContext } from 'react';

import { SavingContext } from '~/global-context/saving';

export const useSave = () => useContext(SavingContext);
