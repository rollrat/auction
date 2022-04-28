import Joi from "joi";

export interface QuerySchema {
  courtName?: string,
  eventNumber?: string,
}

export const querySchema = Joi.object({
  courtName: Joi.string().max(12),
  eventNumber: Joi.string().max(12),
});