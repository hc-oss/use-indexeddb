import React, { createContext, useContext, useEffect, useState } from "react";

import { getActions, getConnection } from "./db";
import { IndexedDBConfig } from "./interfaces";

interface UseIndexedDBProps {
  config: IndexedDBConfig;
  children?;
  loading?;
  fallback?;
  actions?: typeof getActions;
}

const IndexedDBContext = createContext<UseIndexedDBProps>({} as UseIndexedDBProps);

const IndexedDBProvider = (props: UseIndexedDBProps) => {
  const [isInitialized, setIsInitialized] = useState(0);

  useEffect(() => {
    getConnection(props.config)
      .then(() => setIsInitialized(1))
      .catch(() => setIsInitialized(2));
  }, []);

  switch (isInitialized) {
    case 1:
      return (
        <IndexedDBContext.Provider value={{ config: props.config, actions: getActions }}>
          {props.children}
        </IndexedDBContext.Provider>
      );

    case 2:
      console.warn("Not Supported");
      return props.fallback || null;

    default:
      return props.loading || null;
  }
};

export function useIndexedDBStore<T>(storeName: string) {
  const ctx = useContext(IndexedDBContext);
  return ctx.actions<T>(storeName, ctx.config);
}

export default IndexedDBProvider;
