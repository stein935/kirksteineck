import { useLoaderData } from "react-router-dom";
import "../App.css";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Page } from "../utilities/Loaders";

const Home = () => {
  const data: Page = useLoaderData() as Page;
  return (
    <>
      <div
        className={`bg-${data.bg_pattern} bg-gradient-to-r from-${data.color_1} to-${data.color_2} py-10 sm:py-20 md:py-40`}
      >
        <div className="container mx-auto space-y-4 px-10">
          <h1 className="not-prose mb-0 font-display text-4xl text-white">
            {data.heading}
          </h1>
          <p className="mt-0 font-serif italic text-white">
            {data.sub_heading}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.nav.map((item) => (
              <Card key={item.title} data={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer
        title={data.title}
        bg_pattern={data.bg_pattern}
        color_1={data.color_1}
        color_2={data.color_2}
      />
    </>
  );
};

export default Home;
