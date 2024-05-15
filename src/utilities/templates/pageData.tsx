export interface PageData {
  section: string;
  formType: string;
  fields?: {
    field: string;
    formType: string;
    type: string;
    defaultValue: string;
    options?: string[];
  }[];
}

const pageData: PageData[] = [
  {
    section: "Headings",
    formType: "fieldset",
    fields: [
      {
        field: "heading",
        formType: "input",
        type: "string",
        defaultValue: "",
      },
      {
        field: "sub_heading",
        formType: "input",
        type: "string",
        defaultValue: "",
      },
    ],
  },
  {
    section: "Design",
    formType: "fieldset",
    fields: [
      {
        field: "bg_pattern",
        formType: "select",
        type: "string",
        defaultValue: "",
        options: [
          "4-point-stars",
          "church-on-sunday",
          "falling-triangles",
          "hideout",
          "wiggle",
        ],
      },
      {
        field: "color_1",
        formType: "input",
        type: "string",
        defaultValue: "indigo-500",
      },
      {
        field: "color_2",
        formType: "input",
        type: "string",
        defaultValue: "indigo-600",
      },
    ],
  },
  {
    section: "Content",
    formType: "button",
  },
  {
    section: "Nav",
    formType: "button",
  },
];

export default pageData;
