import request from "superagent";
import prefix from "superagent-prefix";
import Commander from "./commander";
import Subscriber from "./subscriber";

class Webdis {
  private readonly prefixedUrl: string;
  private readonly dbIndex?: number;
  private readonly agent: request.SuperAgentStatic & request.Request;
  private readonly commander: Commander;
  private subscriptions: Record<string, Subscriber>;

  constructor(url: string, dbIndex?: number) {
    this.dbIndex = dbIndex;
    this.prefixedUrl = this.dbIndex? `${url}/${this.dbIndex}`: url;
    this.agent = request.agent().use(prefix(this.prefixedUrl));
    this.commander = new Commander(this.agent);
    this.subscriptions = {};
  }

  getCommander() {
    return this.commander;
  }

  // if found, then reuse and add a new listener
  // else create a new one
  subscribe(channel: string, cb: any) {
    const subscription = this.subscriptions[channel];
    if(subscription) {
      return subscription.registerCb(cb);
    } else {
      const subscriber = new Subscriber(this.prefixedUrl, channel);
      this.subscriptions[channel] = subscriber;
      return subscriber.registerCb(cb);
    }
  }

  unsubscribe(channel: string, uuid: string) {
    const subscription = this.subscriptions[channel];
    if(subscription) {
      subscription.unregisterCb(uuid);
    } else {
      console.error(`No subscription found for channel: ${channel} and uuid: ${uuid}`);
    }
  }

  async publish(channel: string, message: string) {
    
  }
}

export default Webdis;