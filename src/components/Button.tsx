import { MouseEventHandler, useEffect, useState } from "react";
import Icon from "./Icon";

interface Props {
  color_1?: string;
  color_2?: string;
  iconId?: string;
  iconVariant?: "solid" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: string;
}

interface Size {
  px: string;
  py: string;
  size: string;
  text: string;
}

const Button = (props: Props) => {
  const defaultSize = "md";

  const buttonSize: { [key: string]: Size } = {
    xs: { px: "1.5", py: "1", size: "4", text: props.size || defaultSize },
    sm: { px: "2", py: "1.5", size: "5", text: props.size || defaultSize },
    md: { px: "3", py: "2", size: "6", text: "base" },
    lg: { px: "4", py: "3", size: "7", text: props.size || defaultSize },
    xl: { px: "5", py: "4", size: "8", text: props.size || defaultSize },
  };
  const [state, setState] = useState<Size>({
    px: "3",
    py: "2",
    size: "6",
    text: "base",
  });

  useEffect(() => {
    setState((state) => ({
      ...state,
      ...buttonSize[props.size || defaultSize],
    }));
  }, []);
  return (
    <>
      <button
        className={`bg-${props.color_1} disabled:bg-stone-400 disabled:italic disabled:text-stone-300 hover:bg-${props.color_2} mt-0 inline rounded${props.size === defaultSize || props.size === undefined ? "" : "-" + props.size} px-${state.px} py-${state.py} text-white shadow-${props.size} mb-1 mr-1 leading-3`}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.iconId && (
          <Icon
            variant={props.iconVariant || "outline"}
            id={props.iconId}
            className={`mr-${props.children ? "1" : "0"} inline size-${state.size}`}
          />
        )}
        <div
          className={`text-${state.text} inline h-full align-middle font-bold`}
        >
          {props.children}
        </div>
      </button>
    </>
  );
};

export default Button;
