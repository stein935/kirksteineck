import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { Elements } from "./form";
import Button from "./Button";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Content,
  Nav,
  // Nav,
  Page,
} from "../utilities/Loaders";
import pageData from "../utilities/templates/pageData";
import firebase from "../utilities/Firebase";

const EditForm = () => {
  const data = useLoaderData() as Page;
  const params = useParams();
  const [page, setPage]: [Page, Dispatch<SetStateAction<Page>>] = useState(
    {} as Page,
  );
  const [nav, setNav]: [
    { [key: string]: boolean },
    Dispatch<SetStateAction<{ [key: string]: boolean }>>,
  ] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    pageData.map((section) => {
      setNav((prevState) => {
        return {
          ...prevState,
          [section.title.toLowerCase()]:
            params.area === section.title.toLowerCase() ? true : false,
        };
      });
    });
    setPage(data);
  }, [params, data]);

  const handleChange =
    (index: number) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      e.preventDefault();
      setDisabled(false);
      ["headings", "design"].includes(params.area as string)
        ? setPage((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        : params.area === "content"
          ? setPage((prevState) => ({
              ...prevState,
              content: prevState.content.map((el) =>
                prevState.content.indexOf(el) === index
                  ? { ...el, [e.target.name]: e.target.value }
                  : el,
              ),
            }))
          : params.area === "nav"
            ? setPage((prevState) => ({
                ...prevState,
                nav: prevState.nav.map((el) =>
                  prevState.nav.indexOf(el) === index
                    ? { ...el, [e.target.name]: e.target.value }
                    : el,
                ),
              }))
            : true;
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    console.log(page);
    await firebase.updateDocData("pages", page, params.page as string);
  };

  return (
    <>
      <h1>{page.heading}</h1>
      <div className="space-y-8">
        <form className="space-y-4 divide-y" onSubmit={handleSubmit}>
          {pageData.map((section) => {
            return (
              <NavLink
                key={`${page.title}-${section.title}`}
                to={`/admin/${page.title}/${section.title.toLowerCase()}`}
                className="not-prose"
              >
                <Button
                  size="sm"
                  type="button"
                  className={
                    params.area === section.title.toLowerCase()
                      ? "bg-indigo-800"
                      : undefined
                  }
                >
                  {section.title}
                </Button>
              </NavLink>
            );
          })}
          <Button
            disabled={disabled}
            type="submit"
            size="sm"
            color_1="lime-600"
            color_2="lime-700"
            onClick={handleSubmit}
          >
            save
          </Button>
          {pageData.map((section) => {
            if (
              section.title.toLowerCase() === params.area &&
              nav[params.area]
            ) {
              return (
                <div
                  key={section.title}
                  className="grid grid-cols-1 gap-6 py-8"
                >
                  <legend className="block text-2xl font-bold">
                    {section.title}
                  </legend>
                  {section.fields &&
                    section.fields.map((field, index) => {
                      return (
                        <div
                          key={`${page.title}-${params.area}-${field.field}`}
                        >
                          {field.formType === "input" && (
                            <Elements.Input
                              name={field.field}
                              label={field.field}
                              value={
                                (page[field.field] as string) ||
                                field.defaultValue
                              }
                              onChange={handleChange(index)}
                            />
                          )}
                          {field.formType === "select" && (
                            <Elements.Select
                              name={field.field}
                              label={field.field}
                              value={
                                (page[field.field] as string) ||
                                field.defaultValue
                              }
                              options={field.options}
                              onChange={handleChange(index)}
                            />
                          )}
                        </div>
                      );
                    })}
                  {params.area === "content" &&
                    (page[params.area] as Content[]).map((field, index) => {
                      return (
                        <div key={`${page.title}-content-${index}`}>
                          {["h1", "h2"].includes(field.type) && (
                            <Elements.Input
                              name="text"
                              label={field.type}
                              value={field.text}
                              onChange={handleChange(index)}
                            />
                          )}
                          {field.type === "body" && (
                            <Elements.Textarea
                              name="text"
                              label={field.type}
                              value={field.text}
                              onChange={handleChange(index)}
                            />
                          )}
                        </div>
                      );
                    })}
                  {params.area === "nav" && page[params.area].length > 0 ? (
                    (page[params.area] as Nav[]).map((nav, index) => {
                      return (
                        <fieldset
                          key={`${page.title}-nav-${index}`}
                          className="my-4 border-l-2 border-indigo-800 pl-6"
                        >
                          {Object.keys(nav).map((key) => (
                            <Elements.Input
                              key={`${page.title}-nav-${index}-${key}`}
                              name={key}
                              label={key}
                              value={nav[key]}
                              onChange={handleChange(index)}
                            />
                          ))}
                        </fieldset>
                      );
                    })
                  ) : (
                    <>Nuffin</>
                  )}
                </div>
              );
            }
          })}
        </form>
      </div>
    </>
  );
};
export default EditForm;
