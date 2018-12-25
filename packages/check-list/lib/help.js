const commander = require('commander')

// ===== Usage. =====
commander
    .version(require('../package.json').version)
    .usage('[options]')
    // .usage('<command> [options]')
    .option('-c, --config', 'config path')
    // .command('init', 'generate a new project from a template')
    .parse(process.argv)

//===== Help. =====
commander.on('--help', function () {
    console.log('\nExamples:')
    console.log('# check health with config')
    console.log('$ check config-path\n')
})

function help() {
    commander.parse(process.argv)
    if (commander.args.length < 1) return commander.help()
}

module.exports = help
