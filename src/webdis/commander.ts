import request from "superagent";
import prefix from "superagent-prefix";

type Ok = "OK";
const Ok = "OK";

class Commander {
  private readonly agent: request.SuperAgentStatic & request.Request;
  private db?: number;

  constructor(url: string, db?: number) {
    this.db = db;
    this.agent = request
      .agent()
      .use(prefix(url))
      .accept("json");
  }

  private makeCommand(command: string) {
    return this.db !== undefined? this.db + "/" + command: command;
  }

  async call(url: string): Promise<any> {
    try {
      const command = this.makeCommand(url);
      const res = await this.agent.post("/").send(command);
      return res.body;
    } catch (e) {
      console.error(e);
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
}

export default Commander;