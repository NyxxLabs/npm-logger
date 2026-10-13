
<h1><img src="https://github.com/NyxxLabs/.github/blob/main/img/icon.png"> @nyx-labs/logger</h1>

[![npm version](https://img.shields.io/npm/v/@nyx-labs/logger.svg)](https://www.npmjs.com/package/@nyx-labs/logger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENCE)

An NPM module offering greater flexibility for managing your logs.


## Example

```JavaScript
const { logger } = require('@nyx-labs/logger');

logger.info("Information");
logger.warn("Warning");
logger.success("Success");
logger.error("Error");
logger.debug("Debug message");
```

What is returned:
```
[12:32:22][INFO] Information
[12:32:22][WARN] Warning
[12:32:22][SUCCESS] Success
[12:32:22][ERROR] Error
[12:32:22][DEBUG] Debug message
```

## Change parameters

You can modify the module settings as follows:
```JavaScript
const { Logger } = require('@nyx-labs/logger');
const logger = new Logger({
    debug: false,
    timestamp: false,
    logFile: "./optionnal", // If there is a log file, all logs will be recorded in it.
})
```

What is returned when using the same code with different parameters:
```
[INFO] Information
[WARN] Warning
[SUCCESS] Success
[ERROR] Error
```
