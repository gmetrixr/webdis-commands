// https://github.com/nicolasff/webdis#pubsub-with-chunked-transfer-encoding
import {v4} from "uuid";

class Subscriber {
  private readonly url: string;
  private prevResponseLength = 0;
  private xhr: XMLHttpRequest;
  private listeners: Record<string, any>;
  private channel: string;

  constructor(url: string, channel: string) {
    this.listeners = {};
    this.channel = channel;
    this.url = url;
    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener("readystatechange", () => this.onReadyStateChange());
    this.xhr.open("GET", `${this.url}/SUBSCRIBE/${this.channel}`);
    this.xhr.send(null);
  }

  onReadyStateChange() {
    if(this.xhr.readyState === 3) {
      const response = this.xhr.responseText;
      const chunk = response.slice(this.prevResponseLength);
      this.prevResponseLength = response.length;
      console.log(chunk);
      // TODO: Fire all listeners
    }
  }

  registerCb(cb: any) {
    const uuid = v4();
    this.listeners[uuid] = cb;
    return uuid;
  }

  unregisterCb(uuid: string) {
    delete this.listeners[uuid];
  }

  destroy() {
    this.xhr.abort();
  }
}

export default Subscriber;