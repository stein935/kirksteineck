import { Link } from "react-router-dom";
import Icon from "./Icon";

interface Props {
  data: {
    action: string;
    cta: string;
    icon: string;
    sub_title: string;
    title: string;
  };
}

const Card = ({ data }: Props) => {
  return (
    <Link to={data?.action} className="group no-underline">
      <div className="not-prose overflow-hidden rounded-xl border-black/20 shadow-xl transition-transform delay-0 duration-200 ease-in-out group-hover:scale-105 group-hover:border-2 group-hover:shadow-2xl">
        <div className="min-h-28 bg-white p-6">
          <Icon
            variant="outline"
            id={data.icon}
            className="-mt-1.5 mr-2 inline size-6 text-stone-600"
          />
          <h3 className="inline text-lg font-medium leading-6 text-stone-900">
            {data?.title}
          </h3>
          <div className="mt-2">
            <p className="font-serif text-sm italic text-stone-500">
              {data?.sub_title}
            </p>
          </div>
        </div>
        <div className="rounded-b-xl">
          <div className="bg-white/20 px-6 py-3 text-sm font-bold text-white group-hover:bg-white/10">
            <Icon
              className="mr-1 inline size-4 text-white"
              variant={"solid"}
              id={"BoltIcon"}
            />
            {data?.cta}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
