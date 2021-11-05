import React, { useEffect, useRef, useState } from "react";
import Button from "./atoms/Button";
import Dropdown from "./atoms/Dropdown";
import Webdis from "../../src";
import { AppBase, CommandBase, CommandDropdownBase, CommandRes, PubSubInput } from "./styles";

const webdisUrl = "http://localhost:8003";

const options = {
  db: 0,
  auth: "username:passwd"
};

const App = () => {
  const webdis = useRef(new Webdis(webdisUrl, options));

  return (
    <AppBase>
      <Command webdis={webdis.current} />
      <PubSub webdis={webdis.current} />
    </AppBase>
  );
};

const args: Record<string, any> = {
  ping: [],
  set: ["Test1", "USER@1"],
  get: ["Test1"],
  del: ["Test1"]
};

const commands = [
  {
    name: "ping",
    value: "ping"
  },
  {
    name: "set",
    value: "set"
  },
  {
    name: "get",
    value: "get"
  },
  {
    name: "del",
    value: "del"
  }
];

const Command = ({ webdis }: { webdis: Webdis }) => {
  const [selected, setSelected] = useState(commands[0].value);

  const [response, setResponse] = useState("");

  async function call() {
    const arg = args[selected];
    // @ts-ignore
    const res = await webdis.command()[selected](...arg);
    if (res) {
      setResponse(JSON.stringify(res));
    }
  }

  return (
    <div>
      <CommandBase>
        <CommandDropdownBase>
          <Dropdown
            width={200}
            data={commands}
            onChange={setSelected}
            defaultValue={selected}
          />
        </CommandDropdownBase>
        <Button onClick={call}>EXECUTE</Button>
      </CommandBase>
      <CommandRes>
        {response}
      </CommandRes>
    </div>
  );
};

const PubSub = ({ webdis }: { webdis: Webdis }) => {
  const [received, setReceived] = useState("");

  const inputRef = useRef(document.createElement("input"));
  const channel = "process";

  async function publish() {
    await webdis.command().publish(channel, inputRef.current.value);
  }

  useEffect(() => {
    function cb(data: any) {
      console.log(data);
      setReceived(data);
    }

    const id = webdis.subscribe(channel, cb);
    return () => {
      webdis.unsubscribe(channel, id);
    };
  }, []);

  return (
    <div>
      <PubSubInput type={"text"} ref={inputRef}/>
      <Button onClick={publish}>PUBLISH</Button>
      <div>Received: {received}</div>
    </div>
  );
};

export default App;
