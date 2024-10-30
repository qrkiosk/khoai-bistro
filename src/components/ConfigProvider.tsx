import React, { useEffect } from "react";

import { getConfig } from "../utils/config";

const CSS_VARIABLES = {
  "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
  "--zmp-background-color": "#f4f5f6",
  "--zmp-background-white": "#ffffff",
};

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    Object.keys(CSS_VARIABLES)
      .filter((cssVar) => CSS_VARIABLES[cssVar])
      .forEach((cssVar) => {
        document.documentElement.style.setProperty(
          `${cssVar}`,
          CSS_VARIABLES[cssVar]
        );
      });
  }, []);

  useEffect(
    () => () => {
      Object.keys(CSS_VARIABLES).forEach((cssVar) => {
        document.documentElement.style.removeProperty(`${cssVar}`);
      });
    },
    []
  );

  return <>{children}</>;
};

export default ConfigProvider;
