import { z } from "zod";

import { INVALID_FIELD_I18N_KEY,
   INVALID_FIELD_LINK_I18N_KEY,
   REQUIRED_FIELD_I18N_KEY,
} from "~/actions/consts";
import { InformationBoardType } from "~/entities/informationboard";

export const informationboardFormSchema = z
   .object ({
      id: z.string(),
      type: z.nativeEnum(InformationBoardType, {
         errorMap: () => ({ message: INVALID_FIELD_I18N_KEY }),
      }),
      title: z
      .string({ required_error: REQUIRED_FIELD_I18N_KEY })
      .min(1, REQUIRED_FIELD_I18N_KEY),
    description: z.string().optional(),
    link: z
      .string()
      .url(INVALID_FIELD_LINK_I18N_KEY)
      .optional()
      .or(z.literal('')),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
   })
   .refine(
      (data) => {
        if (data.startDate && data.endDate) {
          return new Date(data.startDate) <= new Date(data.endDate);
        }
  
        return true;
      },
      {
         message:
            'routes.congregation.informationboard.form.errors.end-date-before-start-date',
         path: ['endDate'],
      },
   );