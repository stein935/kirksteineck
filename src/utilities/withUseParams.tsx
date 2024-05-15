import { ElementType } from "react";
import { useParams } from "react-router-dom";

const withUseParams = (Component: ElementType) => {
  return (props: object) => {
    const params = useParams();

    console.log(params);

    return <Component {...params} {...props} />;
  };
};

export default withUseParams;
