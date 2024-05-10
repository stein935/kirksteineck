import Header from "../components/Header";
import Footer from "../components/Footer";
import { Page } from "../utilities/Loaders";
import Content from "../components/content";
import { useLoaderData } from "react-router-dom";

const Base = () => {
  const data: Page = useLoaderData() as Page;
  return (
    <>
      <div className="min-h-screen space-y-4">
        <Header
          color_1={data.color_1}
          color_2={data.color_2}
          heading={data.heading}
          sub_heading={data.sub_heading}
        />
        <div className="container mx-auto px-10">
          <Content data={data.content} />
        </div>
        <Footer
          title={data.title}
          bg_pattern={data.bg_pattern}
          color_1={data.color_1}
          color_2={data.color_2}
        />
      </div>
    </>
  );
};
export default Base;
