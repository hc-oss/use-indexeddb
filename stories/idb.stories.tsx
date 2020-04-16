import React from "react";

import IndexedDBProvider from "../src";
import { IndexedDBConfig } from "../src/interfaces";
import IDBOperations from "./idb-operations";

export default {
  title: "Default",
};

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

export const Default = () => (
  <IndexedDBProvider config={idbConfig} loading="Loading...">
    <IDBOperations />
  </IndexedDBProvider>
);
