import "./style.css";

import React, { useEffect, useState } from "react";

import { useIndexedDBStore } from "../src";

interface Fruit {
  id?: number;
  name: string;
  qty: number;
}

const WATERMELON = { name: "🍉 Watermelon", qty: 1 };
const MANGO = { name: "🥭 mango", qty: 4 };

export default function IDBOperations() {
  const actions = useIndexedDBStore<Fruit>("fruits");
  const [out, setOut] = useState<any>({});

  useEffect(() => {
    console.log(out);
  }, [out]);

  const testAdd = async o => {
    const r1 = await actions.add(o);
    setOut(r1);
  };

  const testGetByID = async () => {
    setOut(await actions.getByID(1));
  };

  const testGetAll = async () => {
    setOut(await actions.getAll());
  };

  const testGetOneByKey = async () => {
    setOut(await actions.getOneByKey("qty", 1));
  };

  const testGetManyByKey = async () => {
    setOut(await actions.getManyByKey("qty", 1));
  };

  const testUpdate = async () => {
    setOut(await actions.update({ id: 1, ...MANGO }));
  };

  const testDelete = async () => {
    setOut(await actions.deleteByID(1));
  };

  const testDeleteAll = async () => {
    setOut(await actions.deleteAll());
  };

  const testOpenCursor = async () => {
    await actions.openCursor((e: any) => {
      const c = e.target.result;
      if (c) {
        console.log(c);
        c.continue();
      } else {
        console.log("End");
      }
    });
    setOut("Check console 😃");
  };

  return (
    <div>
      <h1>Output</h1>
      <pre>{JSON.stringify(out, null, 2)}</pre>

      <h1>Actions</h1>
      <button className="success" onClick={() => testAdd(WATERMELON)}>
        Add 🍉
      </button>
      <button className="success" onClick={() => testAdd(MANGO)}>
        Add 🥭
      </button>

      <br />

      <button onClick={testGetByID}>Get by ID [1]</button>
      <button onClick={testGetAll}>Get All</button>

      <br />

      <button onClick={testGetOneByKey}>Get One By Key [qty = 1]</button>
      <button onClick={testGetManyByKey}>Get Many By Key [qty = 1]</button>

      <br />

      <button className="primary" onClick={testUpdate}>
        Set/Update [Mango at #1]
      </button>
      <button className="danger" onClick={testDelete}>
        Delete [ID #1]
      </button>
      <button className="danger" onClick={testDeleteAll}>
        Delete All 🔥
      </button>
      <br />
      <button onClick={testOpenCursor}>Open Cursor ➰</button>

      <h1>Links</h1>
      <a target="_blank" href="https://github.com/harshzalavadiya/use-indexeddb">
        🔗 Star on GitHub
      </a>
      <a target="_blank" href="https://www.npmjs.com/package/use-indexeddb">
        🔗 NPM
      </a>
    </div>
  );
}
