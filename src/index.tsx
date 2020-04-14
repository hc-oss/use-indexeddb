import React, { createContext, useContext, useEffect, useState } from "react";

import { SSRWarning } from "./constants";
import { getActions, getConnection } from "./db";
import { IndexedDBConfig } from "./interfaces";

interface UseIndexedDBProps {
  config: IndexedDBConfig;
  children?;
  actions?: typeof getActions;
}

const ObservationCreateContext = createContext<UseIndexedDBProps>({} as UseIndexedDBProps);

const IndexedDBProvider = (props: UseIndexedDBProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    getConnection(props.config).then(() => setIsInitialized(true));
  }, []);

  return isInitialized ? (
    <ObservationCreateContext.Provider value={{ config: props.config, actions: getActions }}>
      {props.children}
    </ObservationCreateContext.Provider>
  ) : (
    <div data-info={SSRWarning} />
  );
};

export function useIndexedDBStore<T>(storeName: string) {
  const ctx = useContext(ObservationCreateContext);
  return ctx.actions<T>(storeName, ctx.config);
}

export default IndexedDBProvider;
