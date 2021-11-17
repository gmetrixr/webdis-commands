import Commander from "./commander";
import Subscriber from "./subscriber";

type Options = {
  db?: number,
  auth?: string
};

class Webdis {
  private readonly prefixedUrl: string;
  private readonly dbIndex?: number;
  private readonly commander: Commander;
  private subscriptions: Record<string, Subscriber>;
  private options: Options;

  constructor(url: string, options: Options = {}) {
    this.dbIndex = options.db;
    this.prefixedUrl = this.dbIndex !== undefined ? `${url}/${this.dbIndex}` : url;
    this.commander = new Commander(url, options);
    this.subscriptions = {};
    this.options = options;
  }

  command(): Commander {
    return this.commander;
  }

  // if found, then reuse and add a new listener
  // else create a new one
  subscribe(channel: string, cb: (arg: any) => void): string {
    const subscription = this.subscriptions[channel];
    if (subscription) {
      return subscription.registerCb(cb);
    } else {
      const subscriber = new Subscriber(this.prefixedUrl, channel, this.options.auth);
      this.subscriptions[channel] = subscriber;
      return subscriber.registerCb(cb);
    }
  }

  unsubscribe(channel: string, uuid: string): void {
    const subscription = this.subscriptions[channel];
    if (subscription) {
      subscription.unregisterCb(uuid);
    } else {
      console.error(`No subscription found for channel: ${channel} and uuid: ${uuid}`);
    }
  }

  async quit(): Promise<void> {
    for(const sub of Object.values(this.subscriptions)) {
      sub.destroy();
    }
  }
}

export default Webdis;