import { useContext } from 'react';

import { ThemeContext } from '~/global-context/theme';

export const useTheme = () => useContext(ThemeContext);
