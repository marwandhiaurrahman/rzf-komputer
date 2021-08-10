/* ------------------------------------------------------------------------------
@name: WindowScroll
@description: WindowScroll
--------------------------------------------------------------------------------- */

// --- WindowScroll
const WindowScroll = (() => {
  let _lastScrollTop = 0;
  let _delta = 4;
  let _headerHeight = $('.header').height() / 2;

  // --- handleHeaderScroll
  const handleHeaderScroll = () => {

    // --- _scrollTop
    const _scrollTop = $(window).scrollTop();

    // --- Make sure they scroll more than _delta
    if (Math.abs(_lastScrollTop - _scrollTop) <= _delta) {
      return;
    }

    // --- Scroll Down
    if (_scrollTop > _lastScrollTop && _scrollTop > _headerHeight) {
      $('body').addClass('window-scrolled');
    } else {
      // --- Scroll Up
      if (_scrollTop + $(window).height() < $(document).height()) {
        $('body').removeClass('window-scrolled');
      }
    }

    _lastScrollTop = _scrollTop;

  }

  // --- handleScroll
  const handleScroll = () => {
    let _didScroll;

    $(window).scroll(() => {
      _didScroll = true;
      setInterval(() => {
        if (_didScroll) {
          handleHeaderScroll();
          _didScroll = false;
        }
      }, 200);
    });
  }

  // --- init
  const init = () => {
    handleHeaderScroll();
    handleScroll();

  }

  // --- return
  return {
    init,
    checkScroll: handleScroll

  }

})();

export default WindowScroll;
