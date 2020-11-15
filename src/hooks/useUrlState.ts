import queryString from "query-string";
import { useState } from "react";

export function useUrlState(
  name: string
): [string | null, (data: string) => void] {
  // get current value from url
  const parsed = queryString.parse(window.location.search);
  const value = parsed[name] ? (parsed[name] as string) : null;

  const [state, setState] = useState<string | null>(value);

  // set value without page reload
  function updateUrlQuery(data: string) {
    const parsed = queryString.parse(window.location.search);

    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      queryString.stringify({ ...parsed, [name]: data });
    window.history.pushState({ path: newurl }, "", newurl);

    setState(data);
  }

  return [state, updateUrlQuery];
}
