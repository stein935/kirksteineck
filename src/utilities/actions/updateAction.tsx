import { ActionFunctionArgs } from "react-router-dom";
import firebase from "../Firebase";
// import { Content } from "../Loaders";

const updateAction = async ({ request, params }: ActionFunctionArgs) => {
  console.log(params);
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  let dataBase;
  if (params.area === "main") {
    dataBase = updates;
  } else if (params.area === "content") {
    const content: object[] = [];
    Object.keys(updates).forEach((key) => {
      const parsedUpdatesKey = JSON.parse(key);
      content[parsedUpdatesKey[2]] = {
        type: parsedUpdatesKey[0],
        text: updates[key],
      };
    });
    dataBase = { content: content };
  }
  console.log(dataBase);
  await firebase.updateDocData(
    "pages",
    dataBase as object,
    params.page as string,
  );
  return dataBase;
};

export default updateAction;
