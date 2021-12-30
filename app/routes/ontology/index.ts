import fs from "fs/promises";
import path from 'path';
import { LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const out = await (await fs.readFile(path.resolve('./app/routes/ontology/ontology.ttl').toString()))
    return new Response(out);
  } catch (ex) {
    throw new Error();
  }
};

export default null;
