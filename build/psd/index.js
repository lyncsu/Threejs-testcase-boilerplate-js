const convertor = require('./PsdConvertor');

function run(argv) {
  if (argv.length == 0) {
    console.info('Usage: psdFile [outputFile] [--nopack] [--ignore-font] [#buildId]');
    process.exit(0);
  }

  const psdFile = argv[0];
  let option = 0;
  let outputFile;
  let buildId;
  for (const i = 1; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.indexOf('--') == 0) {
      switch (arg.substr(2)) {
        case 'nopack':
          option |= convertor.constants.NO_PACK;
          break;
        case 'ignore-font':
          option |= convertor.constants.IGNORE_FONT;
          break;
        default:
          console.error('unknown argument: ' + arg);
          process.exit(1);
          break;
      }
    } else if (arg.substr(0, 1) == '#') {
      buildId = arg.substr(1);
    } else {
      if (!outputFile) outputFile = arg;
      else {
        console.error('unknown argument: ' + arg);
        process.exit(1);
      }
    }
  }

  convertor
    .convert(psdFile, outputFile, option, buildId)
    .then(function (buildId) {
      console.log('buildId: ' + buildId);
    })
    .catch(console.err);
}

run(process.argv.slice(2));
