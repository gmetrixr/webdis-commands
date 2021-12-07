import request from "superagent";
import prefix from "superagent-prefix";
import chalk from "chalk";

type Ok = "OK";
const Ok = "OK";

type Options = {
  db?: number,
  auth?: string
};

class Commander {
  private readonly agent: request.SuperAgentStatic & request.Request;
  private db?: number;
  private auth?: string[];
  private baseUrl: string;
  constructor(url: string, options: Options = {}) {
    this.db = options.db;
    this.baseUrl = url;
    this.agent = request
      .agent()
      .use(prefix(url))
      .accept("json");

    if(options.auth) {
      // apply auth incase it's passed
      this.auth = options.auth.split(":");
    }
  }

  private makeCommand(command: string) {
    return this.db !== undefined? this.db + "/" + command: command;
  }

  async call(url: string): Promise<any> {
    try {
      const command = this.makeCommand(url);
      const res = this.auth?
        await this.agent
          .auth(this.auth[0], this.auth[1])
          .post("/")
          .send(command):
        await this.agent
          .post("/")
          .send(command);

      return res.body;
    } catch (e) {
      console.error(chalk.red(e));
      return 0;
    }
  }

  async callPut(url: string, payload: any): Promise<any> {
    try {
      const command = this.makeCommand(url);
      const res = this.auth?
        await request
          .agent()
          .auth(this.auth[0], this.auth[1])
          .put(`${this.baseUrl}/${command}`)
          .accept("json")
          .send(payload):
        await this.agent
          .agent()
          .put(`${this.baseUrl}/${command}`)
          .accept("json")
          .send(payload);
      return res.body;
    } catch (e) {
      console.error(chalk.red(e));
      return 0;
    }
  }

  async set(key: string, value: string): Promise<Ok | null> {
    const res = await this.call(`SET/${key}/${value}`);
    return res === 0? null: Ok;
  }

  async get(key: string): Promise<string | null> {
    const res = await this.call(`GET/${key}`);
    return res === 0? null: res.GET;
  }

  async del(key: string): Promise<number | null> {
    const res = await this.call(`DEL/${key}`);
    return res === 0? null: res.DEL;
  }

  async exists(key: string): Promise<number | null> {
    const res = await this.call(`EXISTS/${key}`);
    return res === 0? null: res.EXISTS;
  }

  async sadd(key: string, value: string): Promise<number | null> {
    const res = await this.call(`SADD/${key}/${value}`);
    return res === 0? null: res.SADD;
  }

  async srem(key: string, value: string): Promise<number | null> {
    const res = await this.call(`SREM/${key}/${value}`);
    return res === 0? null: res.SREM;
  }

  async smember(key: string): Promise<null | any[]> {
    const res = await this.call(`SMEMBERS/${key}`);
    return res === 0? null: res.SMEMBERS;
  }

  async hset(name: string, key: string | number, value: any): Promise<number | null> {
    const res = await this.call(`HSET/${name}/${key}/${encodeURIComponent(value)}`);
    return res === 0? null: res.HSET;
  }

  async hget(name: string, key: string): Promise<any | null> {
    const res = await this.call(`HGET/${name}/${key}`);
    return res === 0? null: res.HGET;
  }

  async hgetall(name: string): Promise<any | null> {
    const res = await this.call(`HGETALL/${name}`);
    return res === 0? null: res.HGETALL;
  }

  async hmset(name: string, key: string, value: any): Promise<any[] | null> {
    const res = await this.call(`HMSET/${name}/${key}/${value}`);
    return res === 0? null: res.HMSET;
  }

  async hmget(name: string, key: string): Promise<any[] | null> {
    const res = await this.call(`HMGET/${name}/${key}`);
    return res === 0? null: res.HMGET;
  }

  async hdel(name: string, key: string): Promise<number | null> {
    const res = await this.call(`HDEL/${name}/${key}`);
    return res === 0? null: res.HDEL;
  }

  async sismember(name: string, key: string): Promise<number | null> {
    const res = await this.call(`SISMEMBER/${name}/${key}`);
    return res === 0? null: res.SISMEMBER;
  }

  async expire(key: string, value: number): Promise<number | null> {
    const res = await this.call(`EXPIRE/${key}/${value}`);
    return res === 0? null: res.EXPIRE;
  }

  async keys(key: string): Promise<any[] | null> {
    const res = await this.call(`KEYS/${key}`);
    return res === 0? null: res.KEYS;
  }

  async mget(keys: string[]): Promise<any[]> {
    const res = await this.call(`MGET/${keys.join("/")}`);
    return res === 0? null: res.MGET;
  }

  // utility
  async flushdb(): Promise<any[] | null> {
    const res = await this.call(`FLUSHDB`);
    return res === 0? null: res.FLUSHDB;
  }

  async flushall(): Promise<any[] | null> {
    const res = await this.call(`FLUSHALL`);
    return res === 0? null: res.FLUSHALL;
  }

  async ping(): Promise<any | null> {
    const res = await this.call(`PING`);
    return res === 0? null: res.PING;
  }

  // subscriptions
  async publish(channel: string, message: string): Promise<any | null> {
    const res = await this.callPut(`PUBLISH/${channel}`, message);
    return res === 0? null: res.PUBLISH;
  }

  async unsubscribe(channel: string): Promise<void> {
    const res = await this.call(`UNSUBSCRIBE/${channel}`);
    return res === 0? null: res.UNSUBSCRIBE;
  }
}

export default Commander;