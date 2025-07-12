import { z } from "zod";
import { EditComponent } from "./edit-component";

const schema = (field: any) => {
  return z.object({
    section: z.string(),
    variant: z.string(),
    values: z.record(z.string(), z.any()),
  });
};

const defaultValue = {
  section: "",
  variant: "",
  values: {},
};

export { EditComponent, schema, defaultValue };
