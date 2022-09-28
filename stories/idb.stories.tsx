import React, { useEffect } from "react";

import setupIndexedDB from "../src";
import { IndexedDBConfig } from "../src/interfaces";
import IDBOperations from "./idb-operations";

const idbConfig: IndexedDBConfig = {
  databaseName: "fruity-db",
  version: 1,
  stores: [
    {
      name: "fruits",
      id: { keyPath: "id", autoIncrement: true },
      indices: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "qty", keyPath: "qty" },
      ],
    },
  ],
};

export const Page = () => {
  useEffect(() => {
    setupIndexedDB(idbConfig)
      .then(() => console.log("success"))
      .catch(console.error);
  }, []);

  return <IDBOperations />;
};

export default {
  title: "Default",
  component: Page,
};
