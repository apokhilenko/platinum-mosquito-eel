import queryString from "query-string";
import { useState } from "react";

export function useUrlState(
  name: string
): [string | null, (data: string) => void] {
  // get current value from url
  const parsed = queryString.parse(window.location.search);
  const value = parsed[name] ? (parsed[name] as string) : null;

  // store it in state
  const [state, setState] = useState<string | null>(value);

  // set value without page reload
  function updateUrlQuery(data: string) {
    // get current state of url
    const parsed = queryString.parse(window.location.search);

    // compose new query
    const query = queryString.stringify({ ...parsed, [name]: data });
    // compose new url
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      query;

    // update url in browser history
    window.history.pushState({ path: newurl }, "", newurl);

    // update state
    setState(data);
  }

  return [state, updateUrlQuery];
}
