import React from "react";

class Text {
  Heading = (props: { type: string; children: string }) => {
    const El = React.createElement(props.type, { children: props.children });
    return El;
  };
  Body = (props: { col: string; children: string }) => {
    return (
      <>
        <div
          className={`columns-1 gap-8 text-justify font-serif prose-p:mt-0 md:columns-${props.col} prose-p:whitespace-pre-line`}
        >
          <p>{props.children}</p>
        </div>
      </>
    );
  };
}

const text = new Text();
export default text;
