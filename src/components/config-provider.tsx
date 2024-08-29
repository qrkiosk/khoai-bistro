import React, { ReactNode, useEffect } from "react";

export const ConfigProvider = ({
  children,
  cssVariables,
}: {
  children: ReactNode;
  cssVariables: Record<string, string>;
}) => {
  useEffect(() => {
    Object.keys(cssVariables)
      .filter((cssVar) => cssVariables[cssVar])
      .forEach((cssVar) => {
        document.documentElement.style.setProperty(
          `${cssVar}`,
          cssVariables[cssVar],
        );
      });
  }, [cssVariables]);

  useEffect(
    () => () => {
      Object.keys(cssVariables).forEach((cssVar) => {
        document.documentElement.style.removeProperty(`${cssVar}`);
      });
    },
    [],
  );

  return <>{children}</>;
};
