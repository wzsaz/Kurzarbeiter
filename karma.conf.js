config.set({
  browsers: ['Chrome', 'ChromeHeadlessCustom'],
  customLaunchers: {
    ChromeHeadlessCustom: {
      base: 'ChromeHeadless',
      flags: ['--no-sandbox', '--disable-gpu']
    }
  },
});
