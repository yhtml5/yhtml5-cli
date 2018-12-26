/**
* Copyright (c) 2015-present, yhtml5.com, Inc.
* All rights reserved.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Todo: sha1
 *
 */

const createNonceStr = () => Math.random().toString(36).substr(2, 15);
const createTimestamp = () => String(parseInt(new Date().getTime() / 1000));
const salt = 'zXb1m';

const encrypt = (value) => createNonceStr() + createTimestamp() + salt + value;
const decrypted = (value) => value.split(salt)[1];

exports.encrypt = encrypt;
exports.decrypted = decrypted;
exports.createTimestamp = createTimestamp;
exports.createNonceStr = createNonceStr;
