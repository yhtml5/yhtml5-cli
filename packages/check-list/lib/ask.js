const inquirer = require('inquirer')

function ask(questions) {
    return inquirer
        .prompt([
            { name: 'remind', type: 'confirm', message: 'Do you need to be reminded' },
        ])
        .then(function (answers) {
            if (answers.remind) {
                const _questions = questions.map((question, index) => ({
                    name: String(index),
                    type: 'confirm',
                    message: question
                }))
                return inquirer
                    .prompt(_questions)
                    .then(function (answers) {
                        const ok = !Object.values(answers).includes(false)
                        return ok
                    })
            }
            return true
        })
}

module.exports = ask
