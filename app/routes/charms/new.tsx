import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { ValidationError } from "yup";
import type { SchemaObjectDescription } from "yup/lib/schema";
import Fields, { accumulateErrorsByPath } from "~/components/Fields";
import Charm from "../../../services/Charm";

interface NewCharmErrorResponse {
  message: string;
  messages: string[];
  errors: Record<string, string>;
  values: Record<string, string>;
}

export const loader: LoaderFunction = async () => {
  return Charm.validationSchema.describe();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  try {
    const charmData = Charm.validationSchema.cast(values);
    const charm = new Charm(charmData);
    await charm.save();
    return redirect(`/charms/${charm.slug}`);
  } catch (error) {
    if (error instanceof ValidationError) {
      return json({
        message: error.message,
        messages: error.errors,
        errors: accumulateErrorsByPath(error.inner),
        values: error.value,
      } as NewCharmErrorResponse);
    }
    throw new Error();
  }
};

export default function NewCharm() {
  const data = useLoaderData<SchemaObjectDescription>();
  const transition = useTransition();
  const response = useActionData<NewCharmErrorResponse>();

  return (
    <Form method="post">
      {response?.message && <p>{response.message}</p>}
      <fieldset disabled={transition.state === "submitting"}>
        <Fields fields={data.fields} response={response} />
        <button type="submit">
          {transition.state === "submitting" ? "Creating..." : "Create"}
        </button>
      </fieldset>
    </Form>
  );
}
