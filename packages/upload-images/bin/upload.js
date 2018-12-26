#!/usr/bin/env node
/**
 * Copyright (c) 2014-present, yhtml5, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'
const fs = require('fs')
const path = require('path')

// get the current working directory
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// get check-list config
const configPath = resolveApp(process.argv[2])
const config = require(configPath)

require('../src')(config)
