// Redirect to entry if not authenticated
(function () {
  if (sessionStorage.getItem('tt_auth') !== 'true') {
    window.location.href = 'index.html';
  }
})();
