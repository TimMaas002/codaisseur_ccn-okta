import { useState, useEffect } from "react";
import axios from "axios";

import { FetchState } from "../util/fetchstate";

export function useFetchData<Data>(url: string) {
  const [state, setState] = useState<FetchState<Data>>({
    status: "loading",
  });

  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      try {
        const response = await axios.get(url);
        setState({ status: "success", data: response.data });
      } catch (error) {
        setState({ status: "error", error });
      }
    })();
  }, [url]);

  return state;
}
