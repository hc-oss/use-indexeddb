# use-indexeddb

Lightweight (1KB gzipped) hooks w/ promises for easy IndexedDB access in React ⚓

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://use-indexeddb.netlify.com)
[![GitHub Actions Status](https://github.com/harshzalavadiya/use-indexeddb/workflows/NodeJS/badge.svg)](https://github.com/harshzalavadiya/use-indexeddb/actions)
[![NPM](https://img.shields.io/npm/v/use-indexeddb.svg)](https://npm.im/use-indexeddb)
[![gzip](https://badgen.net/bundlephobia/minzip/use-indexeddb@latest)](https://bundlephobia.com/result?p=use-indexeddb@latest)

## 🔧 Installation

```bash
npm i use-indexeddb    # npm
yarn add use-indexeddb # yarn
```

## 📚 Storybook

[see demo on storybook](https://use-indexeddb.netlify.app/)

## ✨ Features

- 🍃 Lightweight (~1KB gzipped) [no dependencies]
- 🧠 Automatic modal type inference like `useIndexedDBStore<YourInterface>()`
- ✔️ SSR Safe (but don't wrap entire application in it)
- 🤞 Simple [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) based api

## 📦 Examples

1. [add](#addvalue-key)
2. [getByID](#getbyidid)
3. [getAll](#getall)
4. [getOneByIndex](#getonebyindexkeypath-value)
5. [getManyByIndex](#getmanybyindexkeypath-value)
6. [update](#updatevalue-key)
7. [deleteByID](#deletebyidid)
8. [deleteAll](#deleteall)
9. [openCursor](#opencursorcursorcallback-keyrange)

### Full Example

```tsx
import React from "react";
import IndexedDBProvider, { useIndexedDBStore } from "use-indexeddb";

// Database Configuration
const idbConfig = {
  databaseName: "fruity-db",
  version: 1,
  stores: [
    {
      name: "fruits",
      id: { keyPath: "id", autoIncrement: true },
      indices: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "quantity", keyPath: "quantity" },
      ],
    },
  ],
};

// Wrap your child component into Provider
const Container = () => (
  <IndexedDBProvider config={idbConfig}>
    <Example />
  </IndexedDBProvider>
);

const Example = () => {
  const { add } = useIndexedDBStore("fruits");

  const insertFruit = () => {
    add({ name: "Mango 🥭", quantity: 2 }).then(console.log);
  };

  return <button onClick={insertFruit}>Insert</button>;
};

export default Container;
```

### `add(value, key?)`

Inserts given `value` record to selected store, second param is optional key useful if auto-increment is disabled

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { add } = useIndexedDBStore("fruits");

  const onClick = () => {
    add({ name: "Mango 🥭", quantity: 2 })
      .then(d => console.log(`Added Fruit with ID ${d}`))
      .catch(console.error);
  };

  return <button onClick={onClick}>Add</button>;
}
```

### `getByID(id)`

Retrive record by ID

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { getByID } = useIndexedDBStore("fruits");

  const onClick = () => {
    getByID(1)
      .then(console.log)
      .catch(console.error);
  };

  return <button onClick={onClick}>Get - ID 1</button>;
}
```

### `getAll()`

Retrive all records from provided store

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { getAll } = useIndexedDBStore("fruits");

  const onClick = () => {
    getAll()
      .then(console.log)
      .catch(console.error);
  };

  return <button onClick={onClick}>Get All Fruits</button>;
}
```

### `getOneByIndex(keyPath, value)`

Retrives single record if any row matches with given `keyPath` having `value`

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { getOneByIndex } = useIndexedDBStore("fruits");

  const onClick = () => {
    getOneByIndex("quantity", 2)
      .then(console.log)
      .catch(console.error);
  };

  return <button onClick={onClick}>Get Fruit w/ Qty 2</button>;
}
```

### `getManyByIndex(keyPath, value)`

Retrives multiple records in form of array if row matches with given `keyPath` having `value`

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { getManyByIndex } = useIndexedDBStore("fruits");

  const onClick = () => {
    getManyByIndex("quantity", 2)
      .then(console.log)
      .catch(console.error);
  };

  return <button onClick={onClick}>Get All Fruits w/ Qty 2</button>;
}
```

### `update(value, key?)`

Inserts or Updates given `value` in store by `ID`

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { update } = useIndexedDBStore("fruits");

  const onClick = () => {
    update({ id: 1, name: "Strawberry 🍓", quantity: 20 })
      .then(console.log)
      .catch(console.error);
  };

  return <button onClick={onClick}>Update Fruid #1 to Strawberry</button>;
}
```

### `deleteByID(id)`

Deletes record by ID

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { deleteByID } = useIndexedDBStore("fruits");

  const onClick = () => {
    deleteByID(1)
      .then(console.log)
      .catch(console.error);
  };

  return <button onClick={onClick}>Delete Fruit with ID 1</button>;
}
```

### `deleteAll()`

Deletes all records

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { deleteAll } = useIndexedDBStore("fruits");

  const onClick = () => {
    deleteAll()
      .then(console.log)
      .catch(console.error);
  };

  return <button onClick={onClick}>Delete All Fruits</button>;
}
```

### `openCursor(cursorCallback, keyRange?)`

You can use `openCursor` to iterate over objects one by one within given `keyRange`

```jsx
import { useIndexedDBStore } from "use-indexeddb";

function Example() {
  const { openCursor } = useIndexedDBStore("fruits");

  const onClick = () => {
    openCursor(e => {
      const c = e.target.result;
      if (c) {
        console.log(c);
        c.continue();
      } else {
        console.log("that's all folks");
      }
    });
  };

  return <button onClick={onClick}>Open Cursor</button>;
}
```

## 🤠 Credits

- This library takes inspiration from [react-indexed-db](https://github.com/assuncaocharles/react-indexed-db)
- [TypeScript](https://github.com/microsoft/typescript)
- [TSDX](https://github.com/jaredpalmer/tsdx)

## 📜 License

MIT &copy; [harshzalavadiya](https://github.com/harshzalavadiya)
