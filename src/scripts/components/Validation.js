/* ------------------------------------------------------------------------------
@name: Validation
@description: Validation
--------------------------------------------------------------------------------- */

const WHITESPACE = /^ *$/;
const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PHONE_NUMBER = /^(0|\+62)+([0-9]){4,16}/i;
const NUMBERIC = /[0-9]+$/i;
// Form Validation
const ElementSelector = [
  {
    id: 'name',
    validation: {
      required: true
    }
  },
  {
    id: 'email',
    validation: {
      required: true,
      email: true
    }
  },
  {
    id: 'message',
    validation: {
      required: true,
    }
  },
  {
    id: 'phone',
    validation: {
      required: true,
    }
  },
  {
    id: 'address',
    validation: {
      required: true,
    }
  }
];
const ElementEvents = ['input', 'blur'];

const Validation = (() => {

  // - handleInput
  const handleInput = () => {
    $.each(ElementEvents, function(ie, ve) {
      $.each(ElementSelector, function(i, v) {
        $('#'+v.id).on(ve, function() {
          var _val = $(this).val(),
          _target = $(this).attr('data-target'),
          _alertEl = $('#'+_target),
          _errorMessage;

          // Condition if validation does not error
          _alertEl.removeClass('error');
          $(this).parent().removeClass('error');

          // Password Validation
          if (v.validation.minimum) {
            if (_val.length < v.validation.minimumChar) {
              _errorMessage = _alertEl.attr('data-invalid');
            }
          }

          // Email validation
          if (v.validation.email) {
            if (!EMAIL.test(_val)) {
              _errorMessage = _alertEl.attr('data-invalid-email');
            }
          }

          // Phone validation
          if (v.validation.phone) {
            if (!PHONE_NUMBER.test(_val)) {
              _errorMessage = _alertEl.attr('data-invalid-phone');
            }
          }

          // Required validation
          if (WHITESPACE.test(_val)) {
            var _errorMessage = _alertEl.attr('data-req');
          }

          // Error Message
          if (_errorMessage !== undefined) {
            _alertEl.text(_errorMessage);
            _alertEl.addClass('error');
            $(this).parent().addClass('error');
          }
        });
      });
    });
  }

  // handleClick
  const handleClick = () => {
    $('button[type="submit"]').on('click', (e) => {
      $.each(ElementSelector, (i, v) => {
        $('#'+v.id).blur();
      });

      if ($('.error').length > 0) {
        e.preventDefault();
      }
      // console.log(WHITESPACE);
    });
  }

  // - init
  const init = () => {
    handleInput();
    handleClick();
  }

  return {
    init
  }

})();

export default Validation;
