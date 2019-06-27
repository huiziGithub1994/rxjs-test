(function () {
    function hey() {
      console.log('hey');
    }
    function yo() {
      console.log('yo');
    }
    debug(yo); // This works.
    yo();
  })();
  debug(hey);