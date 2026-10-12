import * as fs from "node:fs";

const colors = {
    reset: "\x1b[0m",
    dim: "\x1b[2m",
    blue: "\x1b[34m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    grey: "\x1b[90m"
} as const;

const stripAnsi = (text: string): string => {
    return text.replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "");
}

export interface LoggerOptions {
    debug?: boolean;
    timestamp?: boolean;
    logFile?: string;
    prefix?: string;
}

export class Logger {
    private isDebugEnable: boolean;
    private showTimestamp: boolean;
    private logFilePath?: string;
    private prefix?: string;
    private timers: Map<string, number> = new Map();

    constructor(options: LoggerOptions = {}) {
        this.isDebugEnable = options.debug ?? true;
        this.showTimestamp = options.timestamp ?? true;
        this.logFilePath = options.logFile;
        this.prefix = options.prefix;
    }

    private getTimestamp(): string {
        if (!this.showTimestamp) return "";
        const now = new Date();
        const time = now.toTimeString().split(" ")[0];
        return `${colors.dim}[${time}]${colors.reset}`;
    }

    private writeToFile(message: string): void {
        if (!this.logFilePath) return;

        try {
            const cleanMessage = stripAnsi(message) + "\n\n";
            fs.appendFileSync(this.logFilePath, cleanMessage, "utf-8");
        } catch (err) {
            console.error("Error writing to the log file:", err);
        }
    }

    child(prefix: string): Logger {
        return new Logger({
            prefix: this.prefix ? `${this.prefix}:${prefix}` : prefix,
            debug: this.isDebugEnable,
            timestamp: this.showTimestamp,
            logFile: this.logFilePath
        });
    }

    private log(prefix: string, color: string, ...args: unknown[]): void {
        const time = this.getTimestamp();
        const badge = `${color}[${prefix}]${colors.reset}`;

        let childPrefix;
        if (this.prefix) {
            childPrefix = `${colors.grey}[${this.prefix}]${colors.reset}`;
        } else {
            childPrefix = "";
        }

        const terminalOutput = `${time}${badge}${childPrefix} ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`;
        console.log(terminalOutput);

        this.writeToFile(terminalOutput);
    }

    info(...args: unknown[]): void {
        this.log("INFO", colors.blue, ...args);
    }

    success(...args: unknown[]): void {
        this.log("SUCCESS", colors.green, ...args);
    }

    warn(...args: unknown[]): void {
        this.log("WARN", colors.yellow, ...args);
    }

    error(...args: unknown[]): void {
        this.log("ERROR", colors.red, ...args);
    }

    debug(...args: unknown[]): void {
        if (!this.isDebugEnable) return;
        this.log("DEBUG", colors.magenta, ...args);
    }

    /* TIMER */
    timer(label: string): void {
        this.timers.set(label, performance.now());
    }

    timerEnd(label: string): void {
        const startTime = this.timers.get(label);
        if (startTime === undefined) {
            this.warn(`'${label}' timer does not exist.`);
            return;
        }

        const duration = (performance.now() - startTime).toFixed(2);
        this.timers.delete(label);
        this.log("TIME", colors.cyan, `${label}: ${duration}ms`);
    }

    /* Log File */
    clearLog(): void {
        if (!this.logFilePath) return;
        let filePath = this.logFilePath;

        try {
            const file = fs.readFileSync(filePath);
            fs.unlinkSync(filePath)
        } catch (err) {
            return;
        }
    }
}

export const logger = new Logger();