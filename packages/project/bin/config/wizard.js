module.exports = {
  header: '@fiad',
  headerColor: 'yellow',
  description: 'Welcome to @fiad/project setup wizard and thanks for using it! 🍻\nCheck out the package page at https://git.io/Jftn0 to learn more about available modules.',
  descriptionColor: 'blue',
  questions: [
    {
      type: 'checkbox',
      name: 'modules',
      message: 'Which modules do you need?',
      choices: [
        'toolbox',
        'client',
        'server'
      ]
    }
  ],
  handler: require('../tasks/setup')
}
