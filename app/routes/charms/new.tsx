import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { ICharm } from "types/Charms";
import { ValidationError } from "yup";
import { TextInput } from "~/components/inputs";
import Charm from "../../factory/Charm";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  try {
    const charm = new Charm(values);
    await charm.save();
    return redirect(`/charms/${charm.slug}`);
  } catch (error) {
    if (error instanceof ValidationError) {
      function accumulateErrorsByPath(inner: ValidationError["inner"]) {
        return inner.reduce((acc, err) => {
          let newAcc = { ...acc };
          if (err.inner) {
            newAcc = { ...newAcc, ...accumulateErrorsByPath(err.inner) };
          }
          return {
            ...newAcc,
            [err.path as string]: err.message,
          };
        }, {} as Partial<Record<keyof ICharm, string>>);
      }
      return json({
        message: error.message,
        messages: error.errors,
        errors: accumulateErrorsByPath(error.inner),
        values: error.value,
      });
    } else {
      return json({ message: error.message });
    }
  }
};

export default function NewCharm() {
  const transition = useTransition();
  const actionData =
    useActionData<{ error: string; values: Record<keyof ICharm, string> }>();
  console.log(actionData);
  return (
    <Form method="post">
      {actionData?.error && <p>{actionData.error}</p>}
      <fieldset disabled={transition.state === "submitting"}>
        <p>
          <label>
            Name:{" "}
            <TextInput
              name="name"
              type="text"
              defaultValue={actionData?.values?.name}
            />
          </label>
        </p>
        <p>
          <label>
            Slug:{" "}
            <TextInput
              name="slug"
              type="text"
              defaultValue={actionData?.values?.slug}
            />
          </label>
        </p>
        <p>
          <label>
            Description:
            <br />
            <textarea
              name="description"
              defaultValue={actionData?.values?.description}
            />
          </label>
        </p>
        <p>
          <button type="submit">
            {transition.state === "submitting" ? "Creating..." : "Create"}
          </button>
        </p>
      </fieldset>
    </Form>
  );
}
