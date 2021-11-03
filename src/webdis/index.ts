import request from "superagent";
import prefix from "superagent-prefix";

class Webdis {
  private url: string;
  private dbIndex: number;
  private namespace: string;
  private agent: request.SuperAgentStatic & request.Request;
  constructor(url: string, dbIndex: number, namespace: string) {
    this.url = url;
    this.dbIndex = dbIndex;
    this.namespace = namespace;
    this.agent = request.agent().use(prefix(this.url));
  }

}

export default Webdis;