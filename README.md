[![Build Status](https://drone-xr.gmetri.io/api/badges/gmetrixr/webdis-commands/status.svg)](https://drone-xr.gmetri.io/gmetrixr/webdis-commands)

# webdis-commands
Client library for making webdis server requests

Exposed Commands:
1. set
2. get
3. del
4. exists
4. sadd
4. srem
4. smember
4. hset
4. hget
4. hmset
4. hmget
4. hdel
4. sismember
4. mget
4. flushdb
4. flushall
4. ping
4. publish
4. unsubscribe

## Running example
This repo uses pnpm to run, compile and build code
1. `./sd` - start the docker
2. `p i` - install dependencies. p is an alias for pnpm
3. `cd examples`
4. `p i` - install dependencies for examples
5. `p watch` - start dev server. uses [Snowpack](https://www.snowpack.dev/)

## Basic Usage
```typescript
  import Webdis from "@gmetrixr/webdis-commands";
  const options = {
    db: 1, // set db index
    auth: "username:passwd", // optional auth to webdis server
  };
  const url = "http://localhost:8003";
  const webdis = new Webdis(url, options);
  
  // execute commands
  const response = await webdis.command().ping();
  console.log(response); // [true, "PONG"]
```

## Pub/Sub
```typescript
  import Webdis from "@gmetrixr/webdis-commands";
  const options = {
    db: 1, // set db index
    auth: "username:passwd", // optional auth to webdis server
  };
  const url = "http://localhost:8003";
  const webdis = new Webdis(url, options);
  
  const channel = "process";
  const cb = (data: string | object) => {
    // cb should always test the typeof data here. parsing can result in either text or js objects
  };
  // subcsription
  const id = webdis.subscribe(channel, cb);
  
  // un-subscription
  webdis.unsubscribe(channel, id); // pass the subscription id 
```