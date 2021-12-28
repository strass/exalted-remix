import { FunctionComponent } from "react";
import type { ValidationError } from "yup";
import type { SchemaObjectDescription } from "yup/lib/schema";
import Input from "./inputs";

export function accumulateErrorsByPath(inner: ValidationError["inner"]) {
  return inner.reduce((acc, err) => {
    let newAcc = { ...acc };
    if (err.inner) {
      newAcc = { ...newAcc, ...accumulateErrorsByPath(err.inner) };
    }
    return {
      ...newAcc,
      [err.path as string]: err.message,
    };
  }, {} as Partial<Record<string, string>>);
}

const Fields: FunctionComponent<{
  fields: SchemaObjectDescription["fields"];
  response?: { values: Record<string, string>; errors: Record<string, string> };
}> = ({ fields, response: { values = {}, errors = {} } = {} }) => (
  <>
    {Object.keys(fields).map((path) => {
      const { type, label, tests, meta = {} } = fields[path];
      console.log(fields[path]);
      const required = tests.find((t) => t.name === "required") ? true : false;
      return (
        <p key={path}>
          <label>
            {label}
            {required ? "*" : null}{" "}
            <Input
              type={meta?.type ?? type}
              name={path}
              defaultValue={values?.[path]}
              required={required}
            />
          </label>
          {errors?.[path] && <div>{errors[path]}</div>}
        </p>
      );
    })}
  </>
);

export default Fields;
