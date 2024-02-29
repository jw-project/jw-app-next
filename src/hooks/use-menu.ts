import { useContext } from 'react';

import { MenuContext } from '~/global-context/menu';

export const useMenu = () => useContext(MenuContext);
