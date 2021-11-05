export default {
  "plugins": [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    [
      "@snowpack/plugin-typescript",
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: "yarn pnpify tsc" } : {})
      }
    ]
  ],
  "devOptions": {
    "open": "none",
    "hmrPort": 8001
  },
  "buildOptions": {
    "clean": true,
    "metaUrlPath": "static/snowpack"
  },
  "mount": {
    "src": "/dist",
    "public": { "url": "/", "static": true }
  },
  "workspaceRoot": ".."
};
