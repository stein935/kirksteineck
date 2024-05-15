const Break = (props: {
  bg_pattern: string | undefined;
  color_1: string | undefined;
  color_2: string | undefined;
}) => {
  return (
    <>
      <div
        className={`bg-${props.bg_pattern} h-10 bg-gradient-to-r from-${props.color_1} to-${props.color_2}`}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"></div>
      </div>
    </>
  );
};

export default Break;
