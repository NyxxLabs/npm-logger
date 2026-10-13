<h1><img align="left" width="48px" height:"48px" src="https://github.com/NyxxLabs/.github/blob/main/img/icon.png"> @nyx-labs/logger</h1>

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

## Additional functions
### logger.clearLog()
If in your module parameters there is a log file, then the file will be deleted.
It can be used to reset your log file by using logger.clearLog() when you start your program, and then the next logs will create a new log file.

### logger.timer("label") and logger.timerEnd("label")
You want to know the time between the start of an instruction and the end? Use the logger.timer() and logger.timerEnd() functions.

```JavaScript
const { logger } = require('@nyx-labs/logger');

logger.timer("example");
logger.info("Information");
logger.warn("Warning");
logger.success("Success");
logger.error("Error");
logger.debug("Debug message");
logger.timerEnd("example");
```

What is returned:
```
[12:44:20][INFO] Information
[12:44:20][WARN] Warning
[12:44:20][SUCCESS] Success
[12:44:20][ERROR] Error
[12:44:20][DEBUG] Debug message
[12:44:20][TIME] example: 8.66ms
```
### logger.child("child_name")
You can create some children for your logger. Here is an example:
```JavaScript
const { logger } = require('@nyx-labs/logger');
logger.info("No child");

const dbLogger = logger.child("DB");
dbLogger.info("DB child");

const dbTestLogger = dbLogger.child("TEST");
dbTestLogger.info("DB:TEST child");

// You can create as many children as you want.

```

What is returned:
```
[12:49:46][INFO] No child
[12:49:46][INFO][DB] DB child
[12:49:46][INFO][DB:TEST] DB:TEST child
```
## Our Discord
- [Discord](https://discord.gg/2x9juZp9VX)