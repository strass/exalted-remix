import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import Charm from "../../factory/Charm";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  try {
    const charm = new Charm(values);
    await charm.save();
    console.log(charm);
    return redirect(`/charms/${charm.slug}`);
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message, values });
    }
  }
};

export default function NewCharm() {
  const transition = useTransition();
  const actionData = useActionData();

  return (
    <Form method="post">
      {actionData?.error && <p>{actionData.error}</p>}
      <fieldset disabled={transition.state === "submitting"}>
        <p>
          <label>
            Name: <input name="name" type="text" />
          </label>
        </p>
        <p>
          <label>
            Slug: <input name="slug" type="text" />
          </label>
        </p>
        <p>
          <label>
            Description:
            <br />
            <textarea name="description" />
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
