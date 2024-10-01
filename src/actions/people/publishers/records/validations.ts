import { z } from 'zod';

import { REQUIRED_FIELD_I18N_KEY } from '~/actions/consts';

export const recordFormSchema = z.object({
  id: z.string().optional(),
  year: z.number({ required_error: REQUIRED_FIELD_I18N_KEY }),
  month: z.number({ required_error: REQUIRED_FIELD_I18N_KEY }),
  shared: z.boolean({ required_error: REQUIRED_FIELD_I18N_KEY }),
  studies: z.number({ required_error: REQUIRED_FIELD_I18N_KEY }),
  auxiliaryPioneer: z.boolean({ required_error: REQUIRED_FIELD_I18N_KEY }),
  hours: z.number().optional(),
  credits: z.number().optional(),
  late: z.boolean({ required_error: REQUIRED_FIELD_I18N_KEY }),
  remarks: z.string().optional(),
});
