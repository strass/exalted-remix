import { ActionFunction, json } from "remix";
import { redirect, useActionData, Form } from "remix";
import Charm from "../../factory/Charm";


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  try {
    const charm = new Charm(Object.fromEntries(formData.entries()));
    await charm.save();
    console.log(charm);
    return redirect(`/charms/${charm.slug}`);
  } catch (ex) {
    return json(ex);
  }
};

export default function NewCharm() {
  return (
    <Form method="post">
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
        <button type="submit">Create</button>
      </p>
    </Form>
  );
}
