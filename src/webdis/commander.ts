import request from "superagent";

class Commander {
  private readonly agent: request.SuperAgentStatic & request.Request;
  constructor(agent: request.SuperAgentStatic & request.Request) {
    this.agent = agent;
  }

  async set(key: string, value: any) {
    return await this.agent.get(`/SADD/${key}/${value}`);
  }

  async get(key: string) {
    return await this.agent.get(`/GET/${key}`);
  }

  async del(key: string) {
    return await this.agent.get(`/DEL/${key}`);
  }

  async exists(key: string) {
    return await this.agent.get(`/EXISTS/${key}`);
  }

  async sadd(key: string, value: string) {
    return await this.agent.get(`/SADD/${key}/${value}`);
  }

  async srem(key: string, value: string) {
    return await this.agent.get(`/SREM/${key}/${value}`);
  }

  async smember(key: string) {
    return await this.agent.get(`/SMEMBERS/${key}`);
  }

  async hset(name: string, key: string, value: any) {
    return await this.agent.get(`/HSET/${name}/${key}/${value}`);
  }

  async hget(name: string, key: string) {
    return await this.agent.get(`/HGET/${name}/${key}`);
  }

  async hgetall(name: string) {
    return await this.agent.get(`/HGETALL/${name}`);
  }

  async hmset(name: string, key: string, value: any) {
    return await this.agent.get(`/HMSET/${name}/${key}/${value}`);
  }

  async hmget(name: string, key: string) {
    return await this.agent.get(`/HMGET/${name}/${key}`);
  }

  async hdel(name: string, key: string) {
    return await this.agent.get(`/HDEL/${name}/${key}`);
  }

  async sismember(name: string, key: string) {
    return await this.agent.get(`/SISMEMBER/${name}/${key}`);
  }

  async expire(key: string, value: number) {
    return await this.agent.get(`/EXPIRE/${key}/${value}`);
  }
  async keys(key: string) {
    return await this.agent.get(`/KEYS/${key}`);
  }

  // utility
  async flushdb() {
    return await this.agent.get(`/FLUSHDB`);
  }

  async flushall() {
    return await this.agent.get(`/FLUSHALL`);
  }

}

export default Commander;