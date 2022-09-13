import React from "react";

import IndexedDBProvider from "../src";
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

export const Page = () => (
  <IndexedDBProvider config={idbConfig} loading="Loading..." fallback="Not Supported">
    <IDBOperations />
  </IndexedDBProvider>
);

export default {
  title: "Default",
  component: Page,
};