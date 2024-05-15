interface Props {
  data: {
    text: string;
    type: string;
    col: number;
  }[];
  title: string;
}

const Content = ({ data, title }: Props) => {
  console.log(data);
  return (
    <>
      {data.map((el, index) => {
        if (el.type === "h1") {
          return <h1 key={title + "-" + index}>{el.text}</h1>;
        } else if (el.type === "h2") {
          return <h2 key={title + "-" + index}>{el.text}</h2>;
        } else if (el.type === "body") {
          return (
            <div
              key={title + "-" + index}
              className={`columns-1 gap-8 text-justify font-serif prose-p:mt-0 md:columns-${el.col} prose-p:whitespace-pre-line`}
            >
              <p>{el.text}</p>
            </div>
          );
        }
      })}
    </>
  );
};
export default Content;
