import { useContext } from 'react';

import { TransitionContext } from '~/global-context/transition';

export const useTransition = () => useContext(TransitionContext);
