import { withRouter } from "./with-router";
import { withTanStackQuery } from "./with-tanstack-query";

export const withProviders = (component: () => React.ReactNode) =>
  withTanStackQuery(withRouter(component));
