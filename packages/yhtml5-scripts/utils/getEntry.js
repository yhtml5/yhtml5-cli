const path = require('path');
const assert = require('assert');
const glob = require('glob');
const isPlainObject = require('is-plain-object');
const { basename, sep } = path
const DEFAULT_ENTRY = './src/index.js';
const paths = require('../config/paths');

function getEntry(filePath, isBuild) {
  const key = basename(filePath).replace(/\.(jsx?|tsx?)$/, '');
  const value = isBuild
    ? [filePath]
    : [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      filePath,
    ];
  return {
    [key]: value,
  };
}

function getFiles(entry, cwd) {
  if (Array.isArray(entry)) {
    return entry.reduce((memo, entryItem) => {
      return memo.concat(getFiles(entryItem, cwd));
    }, []);
  } else {
    assert(
      typeof entry === 'string',
      `getEntry/getFiles: entry type should be string, but got ${typeof entry}`,
    );
    const files = glob.sync(entry, {
      cwd,
    });
    return files.map((file) => {
      return (file.charAt(0) === '.') ? file : `.${sep}${file}`;
    });
  }
}

function getEntries(files, isBuild) {
  return files.reduce((memo, file) => {
    return Object.assign(memo, getEntry(file, isBuild));
  }, {});
}

module.exports = function ({
  config = {},
  appDirectory = '',
  isBuild = false
}) {
  const webpackHotDevClient = require.resolve('react-dev-utils/webpackHotDevClient');
  if (config.type === 'MPA') {
    let entries = {};
    config.pages.forEach(function (value) {
      const chunk = basename(value.template, '.js')
      const entry = path.resolve(paths.appPath, value.entry)
      entries[chunk] = isBuild ? entry : [entry, webpackHotDevClient];
    });
    return entries;
  } else {
    return (isBuild
      ? [require.resolve('../config/polyfills'), paths.appIndexJs]
      : [require.resolve('../config/polyfills'), paths.appIndexJs, webpackHotDevClient])
  }

  // MSPA
  const entry = config.entry;
  if (isPlainObject(entry)) {
    if (isBuild) {
      return entry;
    }

    return Object.keys(entry).reduce((memo, key) => (!Array.isArray(entry[key]) ? ({
      ...memo,
      [key]: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        entry[key],
      ],
    }) : ({
      ...memo,
      [key]: entry[key],
    })), {});
  }
  const files = entry ? getFiles(entry, appDirectory) : [DEFAULT_ENTRY];
  return getEntries(files, isBuild);
}



