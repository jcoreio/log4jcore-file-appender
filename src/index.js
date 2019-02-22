// @flow

import fs from 'fs'
import util from 'util'
// platform-specific newline
import { EOL } from 'os'

// Match log4jcore's LogFunctionProvider without depending on log4jcore
export type LogFunctionProvider = (level: number) => Function

export type FileAppender = LogFunctionProvider & {
  stop: () => void,
  flush: () => Promise<void>,
  stopAndFlush: () => Promise<void>,
}

export function createFileAppender({ file }: { file: string }): FileAppender {
  let stopped = false
  let lines: Array<string> = []
  let flushInProgress = false

  const flush = async () => {
    if (!flushInProgress) {
      try {
        flushInProgress = true
        while (lines.length) {
          const linesToFlush = lines
          lines = []
          await new Promise((resolve: Function, reject: Function) => {
            fs.appendFile(file, linesToFlush.join(EOL) + EOL, (err: any) => {
              if (err) reject(err)
              else resolve()
            })
          })
        }
      } finally {
        flushInProgress = false
      }
    }
  }

  const appender = (level: number) => (...args: Array<any>) => {
    if (!stopped) {
      lines.push(
        args
          .map((arg: any) =>
            typeof arg === 'string' ? arg : util.inspect(arg, { depth: 3 })
          )
          .join(' ')
      )
      flush().catch(
        (err: Error) =>
          console.error(`log appender could not flush to ${file}`, err) // eslint-disable-line no-console, no-undef
      )
    }
  }
  appender.flush = flush
  appender.stop = () => {
    stopped = true
  }
  appender.stopAndFlush = async () => {
    appender.stop()
    await flush()
  }
  return appender
}
