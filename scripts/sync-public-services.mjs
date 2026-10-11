import {execFileSync} from "node:child_process";
// Legacy command now builds the canonical React source instead of patching HTML.
execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build:pages"], {stdio:"inherit"});
