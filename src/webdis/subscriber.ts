// https://github.com/nicolasff/webdis#pubsub-with-chunked-transfer-encoding
import { v4 } from "uuid";
// @ts-ignore
import { XMLHttpRequest } from "xmlhttprequest";
import chalk from "chalk";
// @ts-ignore
import base64 from "base-64";


class Subscriber {
  private readonly url: string;
  private prevResponseLength = 0;
  private xhr: XMLHttpRequest;
  private listeners: Record<string, any>;
  private channel: string;

  constructor(url: string, channel: string, auth?: string) {
    this.listeners = {};
    this.channel = channel;
    this.url = url;
    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener("readystatechange", () => this.onReadyStateChange());
    this.xhr.open("GET", `${this.url}/SUBSCRIBE/${this.channel}`);
    if(auth) {
      this.xhr.setRequestHeader("Authorization", "Basic " + base64.encode(auth));
    }
    this.xhr.send(null);
  }

  onReadyStateChange(): void {
    if (this.xhr.readyState === 3) {
      const response = this.xhr.responseText;
      const chunk = response.slice(this.prevResponseLength);
      this.prevResponseLength = response.length;
      // Received CHUNK:  {"SUBSCRIBE":["message","test","{\"some_field\": \"some_value\"}"]}
      try {
        const parsedChunk = JSON.parse(chunk);
        const isMessage = parsedChunk?.SUBSCRIBE?.[0] === "message";
        if (isMessage) {
          // data will be available in index = 2
          for (const cb of Object.values(this.listeners)) {
            /**
             * callback always gets parsed data.
             * callback function should always check the type of data it is receiving then do operations on it.
             */
            cb(parsedChunk?.SUBSCRIBE?.[2]);
          }
        }
      } catch (e) {
        console.error(chalk.red(`Unable to process received message`, chunk), chalk.red(e));
      }
    }
  }

  registerCb(cb: (args: any) => void): string {
    const uuid = v4();
    this.listeners[uuid] = cb;
    return uuid;
  }

  unregisterCb(uuid: string): void {
    delete this.listeners[uuid];
  }

  destroy(): void {
    console.log(chalk.green(`Destroying subscription: `, this.channel));
    // empty the listeners
    this.listeners = {};
    // stop the xhr call
    this.xhr.abort();
  }
}

export default Subscriber;