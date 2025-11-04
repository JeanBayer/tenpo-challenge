import type { PropsWithChildren } from "react";
import { WithRouter } from "./with-router";
import { WithTanStackQuery } from "./with-tanstack-query";

export const WithProviders = ({ children }: PropsWithChildren) => {
  return (
    <WithTanStackQuery>
      {children}
      <WithRouter />
    </WithTanStackQuery>
  );
};
