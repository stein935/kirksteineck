import { Suspense, lazy } from "react";

const Icon = ({
  variant,
  id,
  className,
}: {
  variant: string;
  id: string;
  className: string;
}) => {
  const Compoment = lazy(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              import(
                `../../node_modules/@heroicons/react/24/${variant}/esm/${id}.js`
              ),
            ),
          500,
        ),
      ),
  );
  return (
    <Suspense fallback={<></>}>
      <Compoment className={className} />
    </Suspense>
  );
};
export default Icon;
