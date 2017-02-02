import Jasmine from 'jasmine'

var jasmine = new Jasmine()
jasmine.loadConfig({
    spec_dir: 'server',
    spec_files: [ '**/*.test.js' ]
});

jasmine.execute();

