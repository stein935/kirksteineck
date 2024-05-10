import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

interface Props {
  color_1?: string;
  color_2?: string;
  heading: string;
  sub_heading: string;
}

const Header = (data: Props) => {
  return (
    <>
      <div className="container mx-auto px-10">
        <div className="pt-10 ">
          <a href="/" className="group no-underline">
            <ArrowLongLeftIcon
              className={`text-trans mb-2 mt-1.5 inline size-6 text-stone-600 transition-all duration-75 ease-in-out group-hover:text-${data.color_1} group-active:-ml-4 group-active:text-${data.color_2}`}
            />
            <span
              className={`text-${data.color_1} ml-1 text-xs opacity-0 transition-all duration-75 ease-in-out group-hover:opacity-100 group-active:text-${data.color_2}`}
            >
              back
            </span>
          </a>
          <h1
            className={`not-prose mb-0 bg-gradient-to-r from-${data.color_1} to-${data.color_2} bg-clip-text font-display text-4xl text-transparent`}
          >
            {data.heading}
          </h1>
          <p className="mt-0 font-serif italic text-stone-500">
            {data.sub_heading}
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
