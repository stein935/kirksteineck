export interface PageData {
  title: string;
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
    title: "Headings",
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
    title: "Design",
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
    title: "Content",
  },
  {
    title: "Nav",
  },
];

export default pageData;
