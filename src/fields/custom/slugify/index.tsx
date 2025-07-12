import { z } from "zod";
import { EditComponent } from "./edit-component";
import { ViewComponent } from "./view-component";

const defaultValue = "";

const schema = (field: any) => z.string().default("");

export { EditComponent, ViewComponent, defaultValue, schema };
