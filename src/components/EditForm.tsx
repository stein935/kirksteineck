import {
  Form,
  NavLink,
  useLoaderData,
  useActionData,
  useParams,
} from "react-router-dom";
import { Elements } from "./form";
import Button from "./Button";
import { useState, useEffect } from "react";
import { Content, Nav, Page } from "../utilities/Loaders";
import pageData, { PageData } from "../utilities/templates/pageData";

const EditForm = () => {
  const data = useLoaderData() as Page;
  const params = useParams();
  const area = params.area || "main";
  const areaData =
    area === "main"
      ? (pageData as PageData[])
      : area === "nav"
        ? (data.nav as Nav[])
        : area === "content"
          ? (data.content as Content[])
          : [];
  const actionData = useActionData();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    actionData && setDisabled(true);
  }, [actionData]);

  return (
    <div className="space-y-4 p-10">
      <h1>{data.heading}</h1>
      <div className="space-y-8">
        <Form method="post" className="space-y-4 divide-y">
          {pageData.map((section) => {
            if (section.formType === "button") {
              return (
                <NavLink
                  key={`${params.page}-${section.section}`}
                  to={`/admin/${params.page}/${section.section.toLowerCase()}`}
                  className="not-prose"
                >
                  <Button
                    size="sm"
                    type="button"
                    color_1={
                      params.area === section.section.toLowerCase()
                        ? "indigo-700"
                        : undefined
                    }
                  >
                    {section.section}
                  </Button>
                </NavLink>
              );
            }
          })}
          <Button
            disabled={disabled}
            type="submit"
            size="sm"
            color_1="lime-600"
            color_2="lime-700"
          >
            save
          </Button>
          {area === "main" &&
            (areaData as PageData[]).map((section) => {
              if (section.formType === "fieldset") {
                return (
                  <div
                    key={section.section}
                    className="grid grid-cols-1 gap-6 py-8"
                  >
                    <legend className="block text-2xl font-bold">
                      {section.section}
                    </legend>
                    {section.fields?.map((field, index) => {
                      return (
                        field.formType === "input" && (
                          <Elements.Input
                            key={`${data.title}-${index}`}
                            name={field.field}
                            label={field.field}
                            value={
                              (data[field.field] as string) ||
                              field.defaultValue
                            }
                            onChange={() => setDisabled(false)}
                          />
                        )
                      );
                    })}
                  </div>
                );
              }
            })}
          {area === "content" &&
            (areaData as Content[]).map((el, index) => {
              if (["h1", "h2"].includes(el.type)) {
                return (
                  <Elements.Input
                    key={`${data.title}-${index}`}
                    name={JSON.stringify([el.type, el.text, index])}
                    label={el.type}
                    value={el.text}
                    onChange={() => setDisabled(false)}
                  />
                );
              }
            })}
        </Form>
      </div>
    </div>
  );
};
export default EditForm;
