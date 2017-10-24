window.onload = function() {
  if (( /pointer/gi ).test( window.location.search )) {
    /*
    My pointer sends up/down keys for navigation,
    So I set then do prev/next
     */
    Reveal.configure({
      keyboard: {
        38: 'prev', //up
        40: 'next'  //down
      }
    });
  }
}
