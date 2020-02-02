# log4jcore-file-appender

[![CircleCI](https://circleci.com/gh/jcoreio/log4jcore-file-appender.svg?style=svg)](https://circleci.com/gh/jcoreio/log4jcore-file-appender)
[![Coverage Status](https://codecov.io/gh/jcoreio/log4jcore-file-appender/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/log4jcore-file-appender)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/log4jcore-file-appender.svg)](https://badge.fury.io/js/log4jcore-file-appender)

Append to a file instead of logging to the console in log4jcore

## Quick start

```js
const { logger, setLogFunctionProvider } = require('log4jcore')
const { createFileAppender } = require('log4jcore-file-appender')

const path = require('path')

const file = path.join(__dirname, 'log.txt')
setLogFunctionProvider(createFileAppender({ file }))

const log = logger('loggerName')
log.info('write this to a file')
```
