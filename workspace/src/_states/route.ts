import { useUnmount, ref, readonly } from "lake";
import { map } from "nanostores";
import type { RouteName } from "@/_foundation/type";

type Route = {
  name: RouteName;
};

const routeState = map<Route>({
  name: "home",
});

export const useRouteContext = (callback: (payload: { name: RouteName }) => void) => {
  const route = ref<Route>(routeState.get());

  const unbind = routeState.listen(({ name }) => {
    route.value.name = name;
    callback({
      name,
    });
  });

  useUnmount(() => {
    unbind();
  });

  return readonly(route);
};

export const routeMutators = routeState.set;
