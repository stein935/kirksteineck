import Break from "../components/Break";
import Button from "../components/Button";
import { Link } from "react-router-dom";

interface Props {
  title?: string;
  bg_pattern?: string;
  color_1?: string;
  color_2?: string;
}

const Footer = (props: Props) => {
  return (
    <>
      {props.title != "home" && (
        <Break
          bg_pattern={props.bg_pattern}
          color_1={props.color_1}
          color_2={props.color_2}
        />
      )}
      <div className="container mx-auto flex items-center px-10 pb-8 text-sm text-stone-500">
        <div className="flex-auto">
          <Link to={"/"} className="no-underline">
            <Button
              color_1={props.color_1}
              color_2={props.color_2}
              iconId={"MegaphoneIcon"}
            >
              talk to me!
            </Button>
          </Link>
        </div>
        <div className="flex-auto text-right">© steineck</div>
      </div>
    </>
  );
};

export default Footer;
