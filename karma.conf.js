config.set({
  browsers: ['HeadlessChrome'],
  customLaunchers:{
    HeadlessChrome:{
      base: 'ChromeHeadless',
      flags: ['--no-sandbox']
    }
  }
});
