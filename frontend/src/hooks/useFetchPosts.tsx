import { useEffect, useState } from "react";
import api from "../services/api"; // Api (ajustar)

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetchPosts = <T,>(endpoint: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T>(endpoint);
        setState({ data: response.data, loading: false, error: null });
      } catch (error: Error | unknown) {
        setState({
          data: null,
          loading: false,
          error: (error as Error)?.message
            ? (error as Error).message
            : "An error occurred",
        });
      }
    };

    fetchData();
  }, [endpoint]);

  return state;
};

export default useFetchPosts;
