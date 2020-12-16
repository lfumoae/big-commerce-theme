(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },

  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },

  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/common/utils/form-utils.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/common/utils/form-utils.js ***!
  \****************************************************/
/*! exports provided: createPasswordValidationErrorTextObject, classifyForm, Validators, insertStateHiddenField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPasswordValidationErrorTextObject", function() { return createPasswordValidationErrorTextObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classifyForm", function() { return classifyForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStateHiddenField", function() { return insertStateHiddenField; });
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/forms */ "./assets/js/theme/common/models/forms.js");





var inputTagNames = ['input', 'select', 'textarea'];
/**
 * Set up Object with Error Messages on Password Validation. Please use messages in mentioned order
 * @param {string} empty defines error text for empty field
 * @param {string} confirm defines error text for empty confirmation field
 * @param {string} mismatch defines error text if confirm passford mismatches passford field
 * @param {string} invalid defines error text for invalid password charaters sequence
 * @return {object} messages or default texts if nothing is providing
 */

var createPasswordValidationErrorTextObject = function createPasswordValidationErrorTextObject(empty, confirm, mismatch, invalid) {
  return {
    onEmptyPasswordErrorText: empty,
    onConfirmPasswordErrorText: confirm,
    onMismatchPasswordErrorText: mismatch,
    onNotValidPasswordErrorText: invalid
  };
};
/**
 * Apply class name to an input element on its type
 * @param {object} input
 * @param {string} formFieldClass
 * @return {object} Element itself
 */

function classifyInput(input, formFieldClass) {
  var $input = $(input);
  var $formField = $input.parent("." + formFieldClass);
  var tagName = $input.prop('tagName').toLowerCase();
  var className = formFieldClass + "--" + tagName;
  var specificClassName; // Input can be text/checkbox/radio etc...

  if (tagName === 'input') {
    var inputType = $input.prop('type');

    if (lodash_includes__WEBPACK_IMPORTED_MODULE_2___default()(['radio', 'checkbox', 'submit'], inputType)) {
      // ie: .form-field--checkbox, .form-field--radio
      className = formFieldClass + "--" + lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default()(inputType);
    } else {
      // ie: .form-field--input .form-field--inputText
      specificClassName = "" + className + lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(inputType);
    }
  } // Apply class modifier


  return $formField.addClass(className).addClass(specificClassName);
}
/**
 * Apply class name to each input element in a form based on its type
 * @example
 * // Before
 * <form id="form">
 *     <div class="form-field">
 *         <input type="text">
 *     </div>
 *     <div class="form-field">
 *         <select>...</select>
 *     </div>
 * </form>
 *
 * classifyForm('#form', { formFieldClass: 'form-field' });
 *
 * // After
 * <div class="form-field form-field--input form-field--inputText">...</div>
 * <div class="form-field form-field--select">...</div>
 *
 * @param {string|object} formSelector - selector or element
 * @param {object} options
 * @return {jQuery} Element itself
 */


function classifyForm(formSelector, options) {
  if (options === void 0) {
    options = {};
  }

  var $form = $(formSelector);
  var $inputs = $form.find(inputTagNames.join(', ')); // Obtain options

  var _options = options,
      _options$formFieldCla = _options.formFieldClass,
      formFieldClass = _options$formFieldCla === void 0 ? 'form-field' : _options$formFieldCla; // Classify each input in a form

  $inputs.each(function (__, input) {
    classifyInput(input, formFieldClass);
  });
  return $form;
}
/**
 * Get id from given field
 * @param {object} $field JQuery field object
 * @return {string}
 */

function getFieldId($field) {
  var fieldId = $field.prop('name').match(/(\[.*\])/);

  if (fieldId && fieldId.length !== 0) {
    return fieldId[0];
  }

  return '';
}
/**
 * Insert hidden field after State/Province field
 * @param {object} $stateField JQuery field object
 */


function insertStateHiddenField($stateField) {
  var fieldId = getFieldId($stateField);
  var stateFieldAttrs = {
    type: 'hidden',
    name: "FormFieldIsText" + fieldId,
    value: '1'
  };
  $stateField.after($('<input />', stateFieldAttrs));
}

var Validators = {
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   * @param {string} errorText describes errorMassage on email validation
   */
  setEmailValidation: function setEmailValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = _models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
          cb(result);
        },
        errorMessage: errorText
      });
    }
  },

  /**
   * Validate password fields
   * @param validator
   * @param passwordSelector
   * @param password2Selector
   * @param requirements
   * @param {object} errorTextsObject
   * @param isOptional
   */
  setPasswordValidation: function setPasswordValidation(validator, passwordSelector, password2Selector, requirements, _ref, isOptional) {
    var onEmptyPasswordErrorText = _ref.onEmptyPasswordErrorText,
        onConfirmPasswordErrorText = _ref.onConfirmPasswordErrorText,
        onMismatchPasswordErrorText = _ref.onMismatchPasswordErrorText,
        onNotValidPasswordErrorText = _ref.onNotValidPasswordErrorText;
    var $password = $(passwordSelector);
    var passwordValidations = [{
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.length;

        if (isOptional) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: onEmptyPasswordErrorText
    }, {
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.match(new RegExp(requirements.alpha)) && val.match(new RegExp(requirements.numeric)) && val.length >= requirements.minlength; // If optional and nothing entered, it is valid

        if (isOptional && val.length === 0) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: onNotValidPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val.length;

        if (isOptional) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: onConfirmPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val === $password.val();
        cb(result);
      },
      errorMessage: onMismatchPasswordErrorText
    }];
    validator.add(passwordValidations);
  },

  /**
   * Validate password fields
   * @param {Nod} validator
   * @param {Object} selectors
   * @param {string} selectors.errorSelector
   * @param {string} selectors.fieldsetSelector
   * @param {string} selectors.formSelector
   * @param {string} selectors.maxPriceSelector
   * @param {string} selectors.minPriceSelector
   */
  setMinMaxPriceValidation: function setMinMaxPriceValidation(validator, selectors, priceValidationErrorTexts) {
    if (priceValidationErrorTexts === void 0) {
      priceValidationErrorTexts = {};
    }

    var errorSelector = selectors.errorSelector,
        fieldsetSelector = selectors.fieldsetSelector,
        formSelector = selectors.formSelector,
        maxPriceSelector = selectors.maxPriceSelector,
        minPriceSelector = selectors.minPriceSelector; // eslint-disable-next-line object-curly-newline

    var _priceValidationError = priceValidationErrorTexts,
        onMinPriceError = _priceValidationError.onMinPriceError,
        onMaxPriceError = _priceValidationError.onMaxPriceError,
        minPriceNotEntered = _priceValidationError.minPriceNotEntered,
        maxPriceNotEntered = _priceValidationError.maxPriceNotEntered,
        onInvalidPrice = _priceValidationError.onInvalidPrice;
    validator.configure({
      form: formSelector,
      preventSubmit: true,
      successClass: '_' // KLUDGE: Don't apply success class

    });
    validator.add({
      errorMessage: onMinPriceError,
      selector: minPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: onMaxPriceError,
      selector: maxPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: maxPriceNotEntered,
      selector: maxPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: minPriceNotEntered,
      selector: minPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: onInvalidPrice,
      selector: [minPriceSelector, maxPriceSelector],
      validate: 'min-number:0'
    });
    validator.setMessageOptions({
      selector: [minPriceSelector, maxPriceSelector],
      parent: fieldsetSelector,
      errorSpan: errorSelector
    });
  },

  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setStateCountryValidation: function setStateCountryValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: 'presence',
        errorMessage: errorText
      });
    }
  },

  /**
   * Removes classes from dirty form if previously checked
   * @param field
   */
  cleanUpStateValidation: function cleanUpStateValidation(field) {
    var $fieldClassElement = $("[data-type=\"" + field.data('fieldType') + "\"]");
    Object.keys(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes).forEach(function (value) {
      if ($fieldClassElement.hasClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value])) {
        $fieldClassElement.removeClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value]);
      }
    });
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*
 Import all product specific js
 */







var WRITE_REVIEW = _global_modal__WEBPACK_IMPORTED_MODULE_6__["modalTypes"].WRITE_REVIEW;

var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);

  function Product(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }

  var _proto = Product.prototype;

  _proto.onReady = function onReady() {
    var _this2 = this;

    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator; // Init collapsible

    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
    $(document).on('opened.fndtn.reveal', function () {
      return _this2.reviewModal.setupFocusableElements(WRITE_REVIEW);
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);

      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }

      return false;
    });
    this.productReviewHandler();
  };

  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };

  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };

  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };

  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");




var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_0__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }
  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */


  var _proto = _default.prototype;

  _proto.initLinkBind = function initLinkBind() {
    var _this = this;

    var $content = $('#productReviews-content', this.$reviewsContent);
    $('.productView-reviewLink').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');

      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
      }
    });
  };

  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    } // force collapse on page load


    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
  }
  /**
   * Inject ID into the pagination link
   */
  ;

  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);

    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }

    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };

  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: this.context.reviewRating
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: this.context.reviewSubject
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: this.context.reviewComment
    }, {
      selector: '.writeReview-form [name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };

  _proto.validate = function validate() {
    return this.validator.performCheck();
  };

  return _default;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }

  var _proto = VideoGallery.prototype;

  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };

  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };

  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };

  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };

  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;

    if (isInitialized) {
      return;
    }

    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL21vZGVscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvcmV2aWV3cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sIm5hbWVzIjpbImZvcm1zIiwiZW1haWwiLCJ2YWx1ZSIsInJlIiwidGVzdCIsInBhc3N3b3JkIiwibm90RW1wdHkiLCJsZW5ndGgiLCJpbnB1dFRhZ05hbWVzIiwiY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0IiwiZW1wdHkiLCJjb25maXJtIiwibWlzbWF0Y2giLCJpbnZhbGlkIiwib25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0Iiwib25Db25maXJtUGFzc3dvcmRFcnJvclRleHQiLCJvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQiLCJvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQiLCJjbGFzc2lmeUlucHV0IiwiaW5wdXQiLCJmb3JtRmllbGRDbGFzcyIsIiRpbnB1dCIsIiQiLCIkZm9ybUZpZWxkIiwicGFyZW50IiwidGFnTmFtZSIsInByb3AiLCJ0b0xvd2VyQ2FzZSIsImNsYXNzTmFtZSIsInNwZWNpZmljQ2xhc3NOYW1lIiwiaW5wdXRUeXBlIiwiYWRkQ2xhc3MiLCJjbGFzc2lmeUZvcm0iLCJmb3JtU2VsZWN0b3IiLCJvcHRpb25zIiwiJGZvcm0iLCIkaW5wdXRzIiwiZmluZCIsImpvaW4iLCJlYWNoIiwiX18iLCJnZXRGaWVsZElkIiwiJGZpZWxkIiwiZmllbGRJZCIsIm1hdGNoIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsIiRzdGF0ZUZpZWxkIiwic3RhdGVGaWVsZEF0dHJzIiwidHlwZSIsIm5hbWUiLCJhZnRlciIsIlZhbGlkYXRvcnMiLCJzZXRFbWFpbFZhbGlkYXRpb24iLCJ2YWxpZGF0b3IiLCJmaWVsZCIsImVycm9yVGV4dCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInZhbCIsInJlc3VsdCIsImVycm9yTWVzc2FnZSIsInNldFBhc3N3b3JkVmFsaWRhdGlvbiIsInBhc3N3b3JkU2VsZWN0b3IiLCJwYXNzd29yZDJTZWxlY3RvciIsInJlcXVpcmVtZW50cyIsImlzT3B0aW9uYWwiLCIkcGFzc3dvcmQiLCJwYXNzd29yZFZhbGlkYXRpb25zIiwiUmVnRXhwIiwiYWxwaGEiLCJudW1lcmljIiwibWlubGVuZ3RoIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwic2VsZWN0b3JzIiwicHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cyIsImVycm9yU2VsZWN0b3IiLCJmaWVsZHNldFNlbGVjdG9yIiwibWF4UHJpY2VTZWxlY3RvciIsIm1pblByaWNlU2VsZWN0b3IiLCJvbk1pblByaWNlRXJyb3IiLCJvbk1heFByaWNlRXJyb3IiLCJtaW5QcmljZU5vdEVudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJvbkludmFsaWRQcmljZSIsImNvbmZpZ3VyZSIsImZvcm0iLCJwcmV2ZW50U3VibWl0Iiwic3VjY2Vzc0NsYXNzIiwic2V0TWVzc2FnZU9wdGlvbnMiLCJlcnJvclNwYW4iLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsIiRmaWVsZENsYXNzRWxlbWVudCIsImRhdGEiLCJPYmplY3QiLCJrZXlzIiwibm9kIiwiY2xhc3NlcyIsImZvckVhY2giLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiV1JJVEVfUkVWSUVXIiwibW9kYWxUeXBlcyIsIlByb2R1Y3QiLCJjb250ZXh0IiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJvblJlYWR5IiwiZG9jdW1lbnQiLCJvbiIsImluZGV4T2YiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidGl0bGUiLCJwYXRobmFtZSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInByb2R1Y3REZXRhaWxzIiwiUHJvZHVjdERldGFpbHMiLCJCQ0RhdGEiLCJwcm9kdWN0X2F0dHJpYnV0ZXMiLCJzZXRQcm9kdWN0VmFyaWFudCIsInZpZGVvR2FsbGVyeSIsImJ1bGtQcmljaW5nSGFuZGxlciIsIiRyZXZpZXdGb3JtIiwicmV2aWV3IiwiUmV2aWV3Iiwic2V0dXBGb2N1c2FibGVFbGVtZW50cyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiXyIsIm1zZ1NwYW5JZCIsImF0dHIiLCJzaWJsaW5ncyIsInRyaWdnZXIiLCJQYWdlTWFuYWdlciIsInN1Ym1pdCIsIiRyZXZpZXdzQ29udGVudCIsIiRjb2xsYXBzaWJsZSIsImluaXRMaW5rQmluZCIsImluamVjdFBhZ2luYXRpb25MaW5rIiwiY29sbGFwc2VSZXZpZXdzIiwiJGNvbnRlbnQiLCJDb2xsYXBzaWJsZUV2ZW50cyIsImNsaWNrIiwiaGFzaCIsIiRuZXh0TGluayIsIiRwcmV2TGluayIsInJldmlld1JhdGluZyIsInJldmlld1N1YmplY3QiLCJyZXZpZXdDb21tZW50IiwicmV2aWV3RW1haWwiLCJWaWRlb0dhbGxlcnkiLCIkZWxlbWVudCIsIiRwbGF5ZXIiLCIkdmlkZW9zIiwiY3VycmVudFZpZGVvIiwiYmluZEV2ZW50cyIsInNlbGVjdE5ld1ZpZGVvIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJHRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJpZCIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJiaW5kIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIsImluZGV4IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLElBQU1BLEtBQUssR0FBRztBQUNWQyxPQURVLGlCQUNKQyxLQURJLEVBQ0c7QUFDVCxRQUFNQyxFQUFFLEdBQUcsWUFBWDtBQUNBLFdBQU9BLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRRixLQUFSLENBQVA7QUFDSCxHQUpTOztBQU1WO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUcsVUFYVSxvQkFXREgsS0FYQyxFQVdNO0FBQ1osV0FBTyxLQUFLSSxRQUFMLENBQWNKLEtBQWQsQ0FBUDtBQUNILEdBYlM7O0FBZVY7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lJLFVBckJVLG9CQXFCREosS0FyQkMsRUFxQk07QUFDWixXQUFPQSxLQUFLLENBQUNLLE1BQU4sR0FBZSxDQUF0QjtBQUNIO0FBdkJTLENBQWQ7QUEwQmVQLG9FQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUVBLElBQU1RLGFBQWEsR0FBRyxDQUNsQixPQURrQixFQUVsQixRQUZrQixFQUdsQixVQUhrQixDQUF0QjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sSUFBTUMsdUNBQXVDLEdBQUcsU0FBMUNBLHVDQUEwQyxDQUFDQyxLQUFELEVBQVFDLE9BQVIsRUFBaUJDLFFBQWpCLEVBQTJCQyxPQUEzQjtBQUFBLFNBQXdDO0FBQzNGQyw0QkFBd0IsRUFBRUosS0FEaUU7QUFFM0ZLLDhCQUEwQixFQUFFSixPQUYrRDtBQUczRkssK0JBQTJCLEVBQUVKLFFBSDhEO0FBSTNGSywrQkFBMkIsRUFBRUo7QUFKOEQsR0FBeEM7QUFBQSxDQUFoRDtBQVFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxTQUFTSyxhQUFULENBQXVCQyxLQUF2QixFQUE4QkMsY0FBOUIsRUFBOEM7QUFDMUMsTUFBTUMsTUFBTSxHQUFHQyxDQUFDLENBQUNILEtBQUQsQ0FBaEI7QUFDQSxNQUFNSSxVQUFVLEdBQUdGLE1BQU0sQ0FBQ0csTUFBUCxPQUFrQkosY0FBbEIsQ0FBbkI7QUFDQSxNQUFNSyxPQUFPLEdBQUdKLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLFNBQVosRUFBdUJDLFdBQXZCLEVBQWhCO0FBRUEsTUFBSUMsU0FBUyxHQUFNUixjQUFOLFVBQXlCSyxPQUF0QztBQUNBLE1BQUlJLGlCQUFKLENBTjBDLENBUTFDOztBQUNBLE1BQUlKLE9BQU8sS0FBSyxPQUFoQixFQUF5QjtBQUNyQixRQUFNSyxTQUFTLEdBQUdULE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLE1BQVosQ0FBbEI7O0FBRUEsUUFBSSx1REFBVyxDQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLFFBQXRCLENBQVgsRUFBNENJLFNBQTVDLENBQUosRUFBNEQ7QUFDeEQ7QUFDQUYsZUFBUyxHQUFNUixjQUFOLFVBQXlCLHdEQUFZVSxTQUFaLENBQWxDO0FBQ0gsS0FIRCxNQUdPO0FBQ0g7QUFDQUQsdUJBQWlCLFFBQU1ELFNBQU4sR0FBa0IseURBQWFFLFNBQWIsQ0FBbkM7QUFDSDtBQUNKLEdBbkJ5QyxDQXFCMUM7OztBQUNBLFNBQU9QLFVBQVUsQ0FDWlEsUUFERSxDQUNPSCxTQURQLEVBRUZHLFFBRkUsQ0FFT0YsaUJBRlAsQ0FBUDtBQUdIO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU0csWUFBVCxDQUFzQkMsWUFBdEIsRUFBb0NDLE9BQXBDLEVBQWtEO0FBQUEsTUFBZEEsT0FBYztBQUFkQSxXQUFjLEdBQUosRUFBSTtBQUFBOztBQUNyRCxNQUFNQyxLQUFLLEdBQUdiLENBQUMsQ0FBQ1csWUFBRCxDQUFmO0FBQ0EsTUFBTUcsT0FBTyxHQUFHRCxLQUFLLENBQUNFLElBQU4sQ0FBVzdCLGFBQWEsQ0FBQzhCLElBQWQsQ0FBbUIsSUFBbkIsQ0FBWCxDQUFoQixDQUZxRCxDQUlyRDs7QUFKcUQsaUJBS1hKLE9BTFc7QUFBQSx1Q0FLN0NkLGNBTDZDO0FBQUEsTUFLN0NBLGNBTDZDLHNDQUs1QixZQUw0QiwwQkFPckQ7O0FBQ0FnQixTQUFPLENBQUNHLElBQVIsQ0FBYSxVQUFDQyxFQUFELEVBQUtyQixLQUFMLEVBQWU7QUFDeEJELGlCQUFhLENBQUNDLEtBQUQsRUFBUUMsY0FBUixDQUFiO0FBQ0gsR0FGRDtBQUlBLFNBQU9lLEtBQVA7QUFDSDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU00sVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEI7QUFDeEIsTUFBTUMsT0FBTyxHQUFHRCxNQUFNLENBQUNoQixJQUFQLENBQVksTUFBWixFQUFvQmtCLEtBQXBCLENBQTBCLFVBQTFCLENBQWhCOztBQUVBLE1BQUlELE9BQU8sSUFBSUEsT0FBTyxDQUFDcEMsTUFBUixLQUFtQixDQUFsQyxFQUFxQztBQUNqQyxXQUFPb0MsT0FBTyxDQUFDLENBQUQsQ0FBZDtBQUNIOztBQUVELFNBQU8sRUFBUDtBQUNIO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFNBQVNFLHNCQUFULENBQWdDQyxXQUFoQyxFQUE2QztBQUN6QyxNQUFNSCxPQUFPLEdBQUdGLFVBQVUsQ0FBQ0ssV0FBRCxDQUExQjtBQUNBLE1BQU1DLGVBQWUsR0FBRztBQUNwQkMsUUFBSSxFQUFFLFFBRGM7QUFFcEJDLFFBQUksc0JBQW9CTixPQUZKO0FBR3BCekMsU0FBSyxFQUFFO0FBSGEsR0FBeEI7QUFNQTRDLGFBQVcsQ0FBQ0ksS0FBWixDQUFrQjVCLENBQUMsQ0FBQyxXQUFELEVBQWN5QixlQUFkLENBQW5CO0FBQ0g7O0FBRUQsSUFBTUksVUFBVSxHQUFHO0FBQ2Y7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLG9CQUFrQixFQUFFLDRCQUFDQyxTQUFELEVBQVlDLEtBQVosRUFBbUJDLFNBQW5CLEVBQWlDO0FBQ2pELFFBQUlELEtBQUosRUFBVztBQUNQRCxlQUFTLENBQUNHLEdBQVYsQ0FBYztBQUNWQyxnQkFBUSxFQUFFSCxLQURBO0FBRVZJLGdCQUFRLEVBQUUsa0JBQUNDLEVBQUQsRUFBS0MsR0FBTCxFQUFhO0FBQ25CLGNBQU1DLE1BQU0sR0FBRzdELHFEQUFLLENBQUNDLEtBQU4sQ0FBWTJELEdBQVosQ0FBZjtBQUVBRCxZQUFFLENBQUNFLE1BQUQsQ0FBRjtBQUNILFNBTlM7QUFPVkMsb0JBQVksRUFBRVA7QUFQSixPQUFkO0FBU0g7QUFDSixHQW5CYzs7QUFxQmY7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lRLHVCQUFxQixFQUFFLCtCQUFDVixTQUFELEVBQVlXLGdCQUFaLEVBQThCQyxpQkFBOUIsRUFBaURDLFlBQWpELFFBRXBCQyxVQUZvQixFQUVMO0FBQUEsUUFEZHJELHdCQUNjLFFBRGRBLHdCQUNjO0FBQUEsUUFEWUMsMEJBQ1osUUFEWUEsMEJBQ1o7QUFBQSxRQUR3Q0MsMkJBQ3hDLFFBRHdDQSwyQkFDeEM7QUFBQSxRQURxRUMsMkJBQ3JFLFFBRHFFQSwyQkFDckU7QUFDZCxRQUFNbUQsU0FBUyxHQUFHOUMsQ0FBQyxDQUFDMEMsZ0JBQUQsQ0FBbkI7QUFDQSxRQUFNSyxtQkFBbUIsR0FBRyxDQUN4QjtBQUNJWixjQUFRLEVBQUVPLGdCQURkO0FBRUlOLGNBQVEsRUFBRSxrQkFBQ0MsRUFBRCxFQUFLQyxHQUFMLEVBQWE7QUFDbkIsWUFBTUMsTUFBTSxHQUFHRCxHQUFHLENBQUNyRCxNQUFuQjs7QUFFQSxZQUFJNEQsVUFBSixFQUFnQjtBQUNaLGlCQUFPUixFQUFFLENBQUMsSUFBRCxDQUFUO0FBQ0g7O0FBRURBLFVBQUUsQ0FBQ0UsTUFBRCxDQUFGO0FBQ0gsT0FWTDtBQVdJQyxrQkFBWSxFQUFFaEQ7QUFYbEIsS0FEd0IsRUFjeEI7QUFDSTJDLGNBQVEsRUFBRU8sZ0JBRGQ7QUFFSU4sY0FBUSxFQUFFLGtCQUFDQyxFQUFELEVBQUtDLEdBQUwsRUFBYTtBQUNuQixZQUFNQyxNQUFNLEdBQUdELEdBQUcsQ0FBQ2hCLEtBQUosQ0FBVSxJQUFJMEIsTUFBSixDQUFXSixZQUFZLENBQUNLLEtBQXhCLENBQVYsS0FDUlgsR0FBRyxDQUFDaEIsS0FBSixDQUFVLElBQUkwQixNQUFKLENBQVdKLFlBQVksQ0FBQ00sT0FBeEIsQ0FBVixDQURRLElBRVJaLEdBQUcsQ0FBQ3JELE1BQUosSUFBYzJELFlBQVksQ0FBQ08sU0FGbEMsQ0FEbUIsQ0FLbkI7O0FBQ0EsWUFBSU4sVUFBVSxJQUFJUCxHQUFHLENBQUNyRCxNQUFKLEtBQWUsQ0FBakMsRUFBb0M7QUFDaEMsaUJBQU9vRCxFQUFFLENBQUMsSUFBRCxDQUFUO0FBQ0g7O0FBRURBLFVBQUUsQ0FBQ0UsTUFBRCxDQUFGO0FBQ0gsT0FiTDtBQWNJQyxrQkFBWSxFQUFFN0M7QUFkbEIsS0Fkd0IsRUE4QnhCO0FBQ0l3QyxjQUFRLEVBQUVRLGlCQURkO0FBRUlQLGNBQVEsRUFBRSxrQkFBQ0MsRUFBRCxFQUFLQyxHQUFMLEVBQWE7QUFDbkIsWUFBTUMsTUFBTSxHQUFHRCxHQUFHLENBQUNyRCxNQUFuQjs7QUFFQSxZQUFJNEQsVUFBSixFQUFnQjtBQUNaLGlCQUFPUixFQUFFLENBQUMsSUFBRCxDQUFUO0FBQ0g7O0FBRURBLFVBQUUsQ0FBQ0UsTUFBRCxDQUFGO0FBQ0gsT0FWTDtBQVdJQyxrQkFBWSxFQUFFL0M7QUFYbEIsS0E5QndCLEVBMkN4QjtBQUNJMEMsY0FBUSxFQUFFUSxpQkFEZDtBQUVJUCxjQUFRLEVBQUUsa0JBQUNDLEVBQUQsRUFBS0MsR0FBTCxFQUFhO0FBQ25CLFlBQU1DLE1BQU0sR0FBR0QsR0FBRyxLQUFLUSxTQUFTLENBQUNSLEdBQVYsRUFBdkI7QUFFQUQsVUFBRSxDQUFDRSxNQUFELENBQUY7QUFDSCxPQU5MO0FBT0lDLGtCQUFZLEVBQUU5QztBQVBsQixLQTNDd0IsQ0FBNUI7QUFzREFxQyxhQUFTLENBQUNHLEdBQVYsQ0FBY2EsbUJBQWQ7QUFDSCxHQXpGYzs7QUEyRmY7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUssMEJBQXdCLEVBQUUsa0NBQUNyQixTQUFELEVBQVlzQixTQUFaLEVBQXVCQyx5QkFBdkIsRUFBMEQ7QUFBQSxRQUFuQ0EseUJBQW1DO0FBQW5DQSwrQkFBbUMsR0FBUCxFQUFPO0FBQUE7O0FBQUEsUUFFNUVDLGFBRjRFLEdBTzVFRixTQVA0RSxDQUU1RUUsYUFGNEU7QUFBQSxRQUc1RUMsZ0JBSDRFLEdBTzVFSCxTQVA0RSxDQUc1RUcsZ0JBSDRFO0FBQUEsUUFJNUU3QyxZQUo0RSxHQU81RTBDLFNBUDRFLENBSTVFMUMsWUFKNEU7QUFBQSxRQUs1RThDLGdCQUw0RSxHQU81RUosU0FQNEUsQ0FLNUVJLGdCQUw0RTtBQUFBLFFBTTVFQyxnQkFONEUsR0FPNUVMLFNBUDRFLENBTTVFSyxnQkFONEUsRUFTaEY7O0FBVGdGLGdDQVVxQkoseUJBVnJCO0FBQUEsUUFVeEVLLGVBVndFLHlCQVV4RUEsZUFWd0U7QUFBQSxRQVV2REMsZUFWdUQseUJBVXZEQSxlQVZ1RDtBQUFBLFFBVXRDQyxrQkFWc0MseUJBVXRDQSxrQkFWc0M7QUFBQSxRQVVsQkMsa0JBVmtCLHlCQVVsQkEsa0JBVmtCO0FBQUEsUUFVRUMsY0FWRix5QkFVRUEsY0FWRjtBQVloRmhDLGFBQVMsQ0FBQ2lDLFNBQVYsQ0FBb0I7QUFDaEJDLFVBQUksRUFBRXRELFlBRFU7QUFFaEJ1RCxtQkFBYSxFQUFFLElBRkM7QUFHaEJDLGtCQUFZLEVBQUUsR0FIRSxDQUdHOztBQUhILEtBQXBCO0FBTUFwQyxhQUFTLENBQUNHLEdBQVYsQ0FBYztBQUNWTSxrQkFBWSxFQUFFbUIsZUFESjtBQUVWeEIsY0FBUSxFQUFFdUIsZ0JBRkE7QUFHVnRCLGNBQVEsZUFBYXNCLGdCQUFiLFNBQWlDRDtBQUgvQixLQUFkO0FBTUExQixhQUFTLENBQUNHLEdBQVYsQ0FBYztBQUNWTSxrQkFBWSxFQUFFb0IsZUFESjtBQUVWekIsY0FBUSxFQUFFc0IsZ0JBRkE7QUFHVnJCLGNBQVEsZUFBYXNCLGdCQUFiLFNBQWlDRDtBQUgvQixLQUFkO0FBTUExQixhQUFTLENBQUNHLEdBQVYsQ0FBYztBQUNWTSxrQkFBWSxFQUFFc0Isa0JBREo7QUFFVjNCLGNBQVEsRUFBRXNCLGdCQUZBO0FBR1ZyQixjQUFRLEVBQUU7QUFIQSxLQUFkO0FBTUFMLGFBQVMsQ0FBQ0csR0FBVixDQUFjO0FBQ1ZNLGtCQUFZLEVBQUVxQixrQkFESjtBQUVWMUIsY0FBUSxFQUFFdUIsZ0JBRkE7QUFHVnRCLGNBQVEsRUFBRTtBQUhBLEtBQWQ7QUFNQUwsYUFBUyxDQUFDRyxHQUFWLENBQWM7QUFDVk0sa0JBQVksRUFBRXVCLGNBREo7QUFFVjVCLGNBQVEsRUFBRSxDQUFDdUIsZ0JBQUQsRUFBbUJELGdCQUFuQixDQUZBO0FBR1ZyQixjQUFRLEVBQUU7QUFIQSxLQUFkO0FBTUFMLGFBQVMsQ0FBQ3FDLGlCQUFWLENBQTRCO0FBQ3hCakMsY0FBUSxFQUFFLENBQUN1QixnQkFBRCxFQUFtQkQsZ0JBQW5CLENBRGM7QUFFeEJ2RCxZQUFNLEVBQUVzRCxnQkFGZ0I7QUFHeEJhLGVBQVMsRUFBRWQ7QUFIYSxLQUE1QjtBQUtILEdBMUpjOztBQTRKZjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0llLDJCQUF5QixFQUFFLG1DQUFDdkMsU0FBRCxFQUFZQyxLQUFaLEVBQW1CQyxTQUFuQixFQUFpQztBQUN4RCxRQUFJRCxLQUFKLEVBQVc7QUFDUEQsZUFBUyxDQUFDRyxHQUFWLENBQWM7QUFDVkMsZ0JBQVEsRUFBRUgsS0FEQTtBQUVWSSxnQkFBUSxFQUFFLFVBRkE7QUFHVkksb0JBQVksRUFBRVA7QUFISixPQUFkO0FBS0g7QUFDSixHQXpLYzs7QUEyS2Y7QUFDSjtBQUNBO0FBQ0E7QUFDSXNDLHdCQUFzQixFQUFFLGdDQUFDdkMsS0FBRCxFQUFXO0FBQy9CLFFBQU13QyxrQkFBa0IsR0FBR3hFLENBQUMsbUJBQWlCZ0MsS0FBSyxDQUFDeUMsSUFBTixDQUFXLFdBQVgsQ0FBakIsU0FBNUI7QUFFQUMsVUFBTSxDQUFDQyxJQUFQLENBQVlDLDRDQUFHLENBQUNDLE9BQWhCLEVBQXlCQyxPQUF6QixDQUFpQyxVQUFDbEcsS0FBRCxFQUFXO0FBQ3hDLFVBQUk0RixrQkFBa0IsQ0FBQ08sUUFBbkIsQ0FBNEJILDRDQUFHLENBQUNDLE9BQUosQ0FBWWpHLEtBQVosQ0FBNUIsQ0FBSixFQUFxRDtBQUNqRDRGLDBCQUFrQixDQUFDUSxXQUFuQixDQUErQkosNENBQUcsQ0FBQ0MsT0FBSixDQUFZakcsS0FBWixDQUEvQjtBQUNIO0FBQ0osS0FKRDtBQUtIO0FBdkxjLENBQW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBRVFxRyxZLEdBQWlCQyx3RCxDQUFqQkQsWTs7SUFFYUUsTzs7O0FBQ2pCLG1CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLG9DQUFNQSxPQUFOO0FBQ0EsVUFBS0MsR0FBTCxHQUFXQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQTNCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQnpGLENBQUMsQ0FBQyxzQ0FBRCxDQUFwQjtBQUNBLFVBQUswRixnQkFBTCxHQUF3QjFGLENBQUMsQ0FBQyx1Q0FBRCxDQUF6QjtBQUNBLFVBQUsyRixXQUFMLEdBQW1CQyw2REFBWSxDQUFDLG9CQUFELENBQVosQ0FBbUMsQ0FBbkMsQ0FBbkI7QUFMaUI7QUFNcEI7Ozs7U0FFREMsTyxHQUFBLG1CQUFVO0FBQUE7O0FBQ047QUFDQTdGLEtBQUMsQ0FBQzhGLFFBQUQsQ0FBRCxDQUFZQyxFQUFaLENBQWUsb0JBQWYsRUFBcUMsWUFBTTtBQUN2QyxVQUFJLE1BQUksQ0FBQ1YsR0FBTCxDQUFTVyxPQUFULENBQWlCLGVBQWpCLE1BQXNDLENBQUMsQ0FBdkMsSUFBNEMsT0FBT1YsTUFBTSxDQUFDVyxPQUFQLENBQWVDLFlBQXRCLEtBQXVDLFVBQXZGLEVBQW1HO0FBQy9GWixjQUFNLENBQUNXLE9BQVAsQ0FBZUMsWUFBZixDQUE0QixJQUE1QixFQUFrQ0osUUFBUSxDQUFDSyxLQUEzQyxFQUFrRGIsTUFBTSxDQUFDQyxRQUFQLENBQWdCYSxRQUFsRTtBQUNIO0FBQ0osS0FKRDtBQU1BLFFBQUlyRSxTQUFKLENBUk0sQ0FVTjs7QUFDQXNFLHVFQUFrQjtBQUVsQixTQUFLQyxjQUFMLEdBQXNCLElBQUlDLCtEQUFKLENBQW1CdkcsQ0FBQyxDQUFDLGNBQUQsQ0FBcEIsRUFBc0MsS0FBS29GLE9BQTNDLEVBQW9ERSxNQUFNLENBQUNrQixNQUFQLENBQWNDLGtCQUFsRSxDQUF0QjtBQUNBLFNBQUtILGNBQUwsQ0FBb0JJLGlCQUFwQjtBQUVBQywwRUFBWTtBQUVaLFNBQUtDLGtCQUFMO0FBRUEsUUFBTUMsV0FBVyxHQUFHbkcsNkVBQVksQ0FBQyxtQkFBRCxDQUFoQztBQUVBLFFBQUltRyxXQUFXLENBQUM1SCxNQUFaLEtBQXVCLENBQTNCLEVBQThCO0FBRTlCLFFBQU02SCxNQUFNLEdBQUcsSUFBSUMsd0RBQUosQ0FBV0YsV0FBWCxDQUFmO0FBRUE3RyxLQUFDLENBQUM4RixRQUFELENBQUQsQ0FBWUMsRUFBWixDQUFlLHFCQUFmLEVBQXNDO0FBQUEsYUFBTSxNQUFJLENBQUNKLFdBQUwsQ0FBaUJxQixzQkFBakIsQ0FBd0MvQixZQUF4QyxDQUFOO0FBQUEsS0FBdEM7QUFFQWpGLEtBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVStGLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHNDQUF0QixFQUE4RCxZQUFNO0FBQ2hFaEUsZUFBUyxHQUFHK0UsTUFBTSxDQUFDRyxrQkFBUCxDQUEwQixNQUFJLENBQUM3QixPQUEvQixDQUFaOztBQUNBLFlBQUksQ0FBQzhCLHdCQUFMLENBQThCTCxXQUE5QjtBQUNILEtBSEQ7QUFLQUEsZUFBVyxDQUFDZCxFQUFaLENBQWUsUUFBZixFQUF5QixZQUFNO0FBQzNCLFVBQUloRSxTQUFKLEVBQWU7QUFDWEEsaUJBQVMsQ0FBQ29GLFlBQVY7QUFDQSxlQUFPcEYsU0FBUyxDQUFDcUYsTUFBVixDQUFpQixPQUFqQixDQUFQO0FBQ0g7O0FBRUQsYUFBTyxLQUFQO0FBQ0gsS0FQRDtBQVNBLFNBQUtDLG9CQUFMO0FBQ0gsRzs7U0FFREgsd0IsR0FBQSxrQ0FBeUJyRyxLQUF6QixFQUFnQztBQUM1QkEsU0FBSyxDQUFDRSxJQUFOLENBQVcsY0FBWCxFQUEyQkUsSUFBM0IsQ0FBZ0MsVUFBQ3FHLENBQUQsRUFBSXpILEtBQUosRUFBYztBQUMxQyxVQUFNRSxNQUFNLEdBQUdDLENBQUMsQ0FBQ0gsS0FBRCxDQUFoQjtBQUNBLFVBQU0wSCxTQUFTLEdBQU14SCxNQUFNLENBQUN5SCxJQUFQLENBQVksTUFBWixDQUFOLFNBQWY7QUFFQXpILFlBQU0sQ0FBQzBILFFBQVAsQ0FBZ0IsTUFBaEIsRUFBd0JELElBQXhCLENBQTZCLElBQTdCLEVBQW1DRCxTQUFuQztBQUNBeEgsWUFBTSxDQUFDeUgsSUFBUCxDQUFZLGtCQUFaLEVBQWdDRCxTQUFoQztBQUNILEtBTkQ7QUFPSCxHOztTQUVERixvQixHQUFBLGdDQUF1QjtBQUNuQixRQUFJLEtBQUtoQyxHQUFMLENBQVNXLE9BQVQsQ0FBaUIsZUFBakIsTUFBc0MsQ0FBQyxDQUEzQyxFQUE4QztBQUMxQyxXQUFLUCxXQUFMLENBQWlCaUMsT0FBakIsQ0FBeUIsT0FBekI7QUFDSDtBQUNKLEc7O1NBRURkLGtCLEdBQUEsOEJBQXFCO0FBQ2pCLFFBQUksS0FBS3ZCLEdBQUwsQ0FBU1csT0FBVCxDQUFpQixlQUFqQixNQUFzQyxDQUFDLENBQTNDLEVBQThDO0FBQzFDLFdBQUtOLGdCQUFMLENBQXNCZ0MsT0FBdEIsQ0FBOEIsT0FBOUI7QUFDSDtBQUNKLEc7OztFQTFFZ0NDLHFEOzs7Ozs7Ozs7Ozs7Ozs7QUNickM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7O0FBR0ksb0JBQVlkLFdBQVosRUFBeUI7QUFDckIsU0FBSzlFLFNBQUwsR0FBaUI2QywyREFBRyxDQUFDO0FBQ2pCZ0QsWUFBTSxFQUFFZixXQUFXLENBQUM5RixJQUFaLENBQWlCLHNCQUFqQjtBQURTLEtBQUQsQ0FBcEI7QUFJQSxTQUFLOEcsZUFBTCxHQUF1QjdILENBQUMsQ0FBQyxrQkFBRCxDQUF4QjtBQUNBLFNBQUs4SCxZQUFMLEdBQW9COUgsQ0FBQyxDQUFDLG9CQUFELEVBQXVCLEtBQUs2SCxlQUE1QixDQUFyQjtBQUVBLFNBQUtFLFlBQUw7QUFDQSxTQUFLQyxvQkFBTDtBQUNBLFNBQUtDLGVBQUw7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBOzs7OztTQUNJRixZLEdBQUEsd0JBQWU7QUFBQTs7QUFDWCxRQUFNRyxRQUFRLEdBQUdsSSxDQUFDLENBQUMseUJBQUQsRUFBNEIsS0FBSzZILGVBQWpDLENBQWxCO0FBRUE3SCxLQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QitGLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFlBQU07QUFDM0MvRixPQUFDLENBQUMsNEJBQUQsQ0FBRCxDQUFnQzBILE9BQWhDLENBQXdDLE9BQXhDOztBQUNBLFVBQUksQ0FBQ1EsUUFBUSxDQUFDbkQsUUFBVCxDQUFrQixTQUFsQixDQUFMLEVBQW1DO0FBQy9CLGFBQUksQ0FBQytDLFlBQUwsQ0FBa0JKLE9BQWxCLENBQTBCUyxxRUFBaUIsQ0FBQ0MsS0FBNUM7QUFDSDtBQUNKLEtBTEQ7QUFNSCxHOztTQUVESCxlLEdBQUEsMkJBQWtCO0FBQ2Q7QUFDQSxRQUFJM0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCOEMsSUFBaEIsSUFBd0IvQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0I4QyxJQUFoQixDQUFxQnJDLE9BQXJCLENBQTZCLGtCQUE3QixNQUFxRCxDQUFqRixFQUFvRjtBQUNoRjtBQUNILEtBSmEsQ0FNZDs7O0FBQ0EsU0FBSzhCLFlBQUwsQ0FBa0JKLE9BQWxCLENBQTBCUyxxRUFBaUIsQ0FBQ0MsS0FBNUM7QUFDSDtBQUVEO0FBQ0o7QUFDQTs7O1NBQ0lKLG9CLEdBQUEsZ0NBQXVCO0FBQ25CLFFBQU1NLFNBQVMsR0FBR3RJLENBQUMsQ0FBQyx5Q0FBRCxFQUE0QyxLQUFLNkgsZUFBakQsQ0FBbkI7QUFDQSxRQUFNVSxTQUFTLEdBQUd2SSxDQUFDLENBQUMsNkNBQUQsRUFBZ0QsS0FBSzZILGVBQXJELENBQW5COztBQUVBLFFBQUlTLFNBQVMsQ0FBQ3JKLE1BQWQsRUFBc0I7QUFDbEJxSixlQUFTLENBQUNkLElBQVYsQ0FBZSxNQUFmLEVBQTBCYyxTQUFTLENBQUNkLElBQVYsQ0FBZSxNQUFmLENBQTFCO0FBQ0g7O0FBRUQsUUFBSWUsU0FBUyxDQUFDdEosTUFBZCxFQUFzQjtBQUNsQnNKLGVBQVMsQ0FBQ2YsSUFBVixDQUFlLE1BQWYsRUFBMEJlLFNBQVMsQ0FBQ2YsSUFBVixDQUFlLE1BQWYsQ0FBMUI7QUFDSDtBQUNKLEc7O1NBRURQLGtCLEdBQUEsNEJBQW1CN0IsT0FBbkIsRUFBNEI7QUFDeEIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS3JELFNBQUwsQ0FBZUcsR0FBZixDQUFtQixDQUFDO0FBQ2hCQyxjQUFRLEVBQUUsb0JBRE07QUFFaEJDLGNBQVEsRUFBRSxVQUZNO0FBR2hCSSxrQkFBWSxFQUFFLEtBQUs0QyxPQUFMLENBQWFvRDtBQUhYLEtBQUQsRUFJaEI7QUFDQ3JHLGNBQVEsRUFBRSxtQkFEWDtBQUVDQyxjQUFRLEVBQUUsVUFGWDtBQUdDSSxrQkFBWSxFQUFFLEtBQUs0QyxPQUFMLENBQWFxRDtBQUg1QixLQUpnQixFQVFoQjtBQUNDdEcsY0FBUSxFQUFFLGtCQURYO0FBRUNDLGNBQVEsRUFBRSxVQUZYO0FBR0NJLGtCQUFZLEVBQUUsS0FBSzRDLE9BQUwsQ0FBYXNEO0FBSDVCLEtBUmdCLEVBWWhCO0FBQ0N2RyxjQUFRLEVBQUUsa0NBRFg7QUFFQ0MsY0FBUSxFQUFFLGtCQUFDQyxFQUFELEVBQUtDLEdBQUwsRUFBYTtBQUNuQixZQUFNQyxNQUFNLEdBQUc3RCw0REFBSyxDQUFDQyxLQUFOLENBQVkyRCxHQUFaLENBQWY7QUFDQUQsVUFBRSxDQUFDRSxNQUFELENBQUY7QUFDSCxPQUxGO0FBTUNDLGtCQUFZLEVBQUUsS0FBSzRDLE9BQUwsQ0FBYXVEO0FBTjVCLEtBWmdCLENBQW5CO0FBcUJBLFdBQU8sS0FBSzVHLFNBQVo7QUFDSCxHOztTQUVESyxRLEdBQUEsb0JBQVc7QUFDUCxXQUFPLEtBQUtMLFNBQUwsQ0FBZW9GLFlBQWYsRUFBUDtBQUNILEc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGTDtBQUFBO0FBQUE7QUFBTyxJQUFNeUIsWUFBYjtBQUNJLHdCQUFZQyxRQUFaLEVBQXNCO0FBQ2xCLFNBQUtDLE9BQUwsR0FBZUQsUUFBUSxDQUFDOUgsSUFBVCxDQUFjLHFCQUFkLENBQWY7QUFDQSxTQUFLZ0ksT0FBTCxHQUFlRixRQUFRLENBQUM5SCxJQUFULENBQWMsbUJBQWQsQ0FBZjtBQUNBLFNBQUtpSSxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsU0FBS0MsVUFBTDtBQUNIOztBQU5MOztBQUFBLFNBUUlDLGNBUkosR0FRSSx3QkFBZUMsQ0FBZixFQUFrQjtBQUNkQSxLQUFDLENBQUNDLGNBQUY7QUFFQSxRQUFNQyxPQUFPLEdBQUdySixDQUFDLENBQUNtSixDQUFDLENBQUNHLGFBQUgsQ0FBakI7QUFFQSxTQUFLTixZQUFMLEdBQW9CO0FBQ2hCTyxRQUFFLEVBQUVGLE9BQU8sQ0FBQzVFLElBQVIsQ0FBYSxTQUFiLENBRFk7QUFFaEIrRSxvQkFBYyxFQUFFSDtBQUZBLEtBQXBCO0FBS0EsU0FBS0ksWUFBTDtBQUNBLFNBQUtDLGNBQUw7QUFDSCxHQXBCTDs7QUFBQSxTQXNCSUQsWUF0QkosR0FzQkksd0JBQWU7QUFDWCxTQUFLWCxPQUFMLENBQWF0QixJQUFiLENBQWtCLEtBQWxCLCtCQUFvRCxLQUFLd0IsWUFBTCxDQUFrQk8sRUFBdEU7QUFDSCxHQXhCTDs7QUFBQSxTQTBCSUcsY0ExQkosR0EwQkksMEJBQWlCO0FBQ2IsU0FBS1gsT0FBTCxDQUFhL0QsV0FBYixDQUF5QixXQUF6QjtBQUNBLFNBQUtnRSxZQUFMLENBQWtCUSxjQUFsQixDQUFpQy9JLFFBQWpDLENBQTBDLFdBQTFDO0FBQ0gsR0E3Qkw7O0FBQUEsU0ErQkl3SSxVQS9CSixHQStCSSxzQkFBYTtBQUNULFNBQUtGLE9BQUwsQ0FBYWhELEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsS0FBS21ELGNBQUwsQ0FBb0JTLElBQXBCLENBQXlCLElBQXpCLENBQXpCO0FBQ0gsR0FqQ0w7O0FBQUE7QUFBQTtBQW9DZSxTQUFTaEQsWUFBVCxHQUF3QjtBQUNuQyxNQUFNaUQsU0FBUyxHQUFHLGVBQWxCO0FBQ0EsTUFBTUMsYUFBYSxHQUFHN0osQ0FBQyxZQUFVNEosU0FBVixPQUF2QjtBQUVBQyxlQUFhLENBQUM1SSxJQUFkLENBQW1CLFVBQUM2SSxLQUFELEVBQVFDLE9BQVIsRUFBb0I7QUFDbkMsUUFBTUMsR0FBRyxHQUFHaEssQ0FBQyxDQUFDK0osT0FBRCxDQUFiO0FBQ0EsUUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUN2RixJQUFKLENBQVNtRixTQUFULGFBQStCaEIsWUFBckQ7O0FBRUEsUUFBSXFCLGFBQUosRUFBbUI7QUFDZjtBQUNIOztBQUVERCxPQUFHLENBQUN2RixJQUFKLENBQVNtRixTQUFULEVBQW9CLElBQUloQixZQUFKLENBQWlCb0IsR0FBakIsQ0FBcEI7QUFDSCxHQVREO0FBVUgsQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvcm1zID0ge1xyXG4gICAgZW1haWwodmFsdWUpIHtcclxuICAgICAgICBjb25zdCByZSA9IC9eLitALitcXC4uKy87XHJcbiAgICAgICAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlcyBhIHBhc3N3b3JkIGZpZWxkXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwYXNzd29yZCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vdEVtcHR5KHZhbHVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2YWxpZGF0ZXMgaWYgYSBmaWVsZCBpcyBlbXB0eVxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIG5vdEVtcHR5KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IDA7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybXM7XHJcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi4vbm9kJztcclxuaW1wb3J0IGZvcm1zIGZyb20gJy4uL21vZGVscy9mb3Jtcyc7XHJcblxyXG5jb25zdCBpbnB1dFRhZ05hbWVzID0gW1xyXG4gICAgJ2lucHV0JyxcclxuICAgICdzZWxlY3QnLFxyXG4gICAgJ3RleHRhcmVhJyxcclxuXTtcclxuLyoqXHJcbiAqIFNldCB1cCBPYmplY3Qgd2l0aCBFcnJvciBNZXNzYWdlcyBvbiBQYXNzd29yZCBWYWxpZGF0aW9uLiBQbGVhc2UgdXNlIG1lc3NhZ2VzIGluIG1lbnRpb25lZCBvcmRlclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZW1wdHkgZGVmaW5lcyBlcnJvciB0ZXh0IGZvciBlbXB0eSBmaWVsZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZmlybSBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGVtcHR5IGNvbmZpcm1hdGlvbiBmaWVsZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWlzbWF0Y2ggZGVmaW5lcyBlcnJvciB0ZXh0IGlmIGNvbmZpcm0gcGFzc2ZvcmQgbWlzbWF0Y2hlcyBwYXNzZm9yZCBmaWVsZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaW52YWxpZCBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGludmFsaWQgcGFzc3dvcmQgY2hhcmF0ZXJzIHNlcXVlbmNlXHJcbiAqIEByZXR1cm4ge29iamVjdH0gbWVzc2FnZXMgb3IgZGVmYXVsdCB0ZXh0cyBpZiBub3RoaW5nIGlzIHByb3ZpZGluZ1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCA9IChlbXB0eSwgY29uZmlybSwgbWlzbWF0Y2gsIGludmFsaWQpID0+ICh7XHJcbiAgICBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQ6IGVtcHR5LFxyXG4gICAgb25Db25maXJtUGFzc3dvcmRFcnJvclRleHQ6IGNvbmZpcm0sXHJcbiAgICBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQ6IG1pc21hdGNoLFxyXG4gICAgb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0OiBpbnZhbGlkLFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICogQXBwbHkgY2xhc3MgbmFtZSB0byBhbiBpbnB1dCBlbGVtZW50IG9uIGl0cyB0eXBlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybUZpZWxkQ2xhc3NcclxuICogQHJldHVybiB7b2JqZWN0fSBFbGVtZW50IGl0c2VsZlxyXG4gKi9cclxuZnVuY3Rpb24gY2xhc3NpZnlJbnB1dChpbnB1dCwgZm9ybUZpZWxkQ2xhc3MpIHtcclxuICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xyXG4gICAgY29uc3QgJGZvcm1GaWVsZCA9ICRpbnB1dC5wYXJlbnQoYC4ke2Zvcm1GaWVsZENsYXNzfWApO1xyXG4gICAgY29uc3QgdGFnTmFtZSA9ICRpbnB1dC5wcm9wKCd0YWdOYW1lJykudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBsZXQgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke3RhZ05hbWV9YDtcclxuICAgIGxldCBzcGVjaWZpY0NsYXNzTmFtZTtcclxuXHJcbiAgICAvLyBJbnB1dCBjYW4gYmUgdGV4dC9jaGVja2JveC9yYWRpbyBldGMuLi5cclxuICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRUeXBlID0gJGlucHV0LnByb3AoJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKF8uaW5jbHVkZXMoWydyYWRpbycsICdjaGVja2JveCcsICdzdWJtaXQnXSwgaW5wdXRUeXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWNoZWNrYm94LCAuZm9ybS1maWVsZC0tcmFkaW9cclxuICAgICAgICAgICAgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke18uY2FtZWxDYXNlKGlucHV0VHlwZSl9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBpZTogLmZvcm0tZmllbGQtLWlucHV0IC5mb3JtLWZpZWxkLS1pbnB1dFRleHRcclxuICAgICAgICAgICAgc3BlY2lmaWNDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtfLmNhcGl0YWxpemUoaW5wdXRUeXBlKX1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBcHBseSBjbGFzcyBtb2RpZmllclxyXG4gICAgcmV0dXJuICRmb3JtRmllbGRcclxuICAgICAgICAuYWRkQ2xhc3MoY2xhc3NOYW1lKVxyXG4gICAgICAgIC5hZGRDbGFzcyhzcGVjaWZpY0NsYXNzTmFtZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGVhY2ggaW5wdXQgZWxlbWVudCBpbiBhIGZvcm0gYmFzZWQgb24gaXRzIHR5cGVcclxuICogQGV4YW1wbGVcclxuICogLy8gQmVmb3JlXHJcbiAqIDxmb3JtIGlkPVwiZm9ybVwiPlxyXG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cclxuICogICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIj5cclxuICogICAgIDwvZGl2PlxyXG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cclxuICogICAgICAgICA8c2VsZWN0Pi4uLjwvc2VsZWN0PlxyXG4gKiAgICAgPC9kaXY+XHJcbiAqIDwvZm9ybT5cclxuICpcclxuICogY2xhc3NpZnlGb3JtKCcjZm9ybScsIHsgZm9ybUZpZWxkQ2xhc3M6ICdmb3JtLWZpZWxkJyB9KTtcclxuICpcclxuICogLy8gQWZ0ZXJcclxuICogPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0taW5wdXQgZm9ybS1maWVsZC0taW5wdXRUZXh0XCI+Li4uPC9kaXY+XHJcbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLXNlbGVjdFwiPi4uLjwvZGl2PlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGZvcm1TZWxlY3RvciAtIHNlbGVjdG9yIG9yIGVsZW1lbnRcclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcclxuICogQHJldHVybiB7alF1ZXJ5fSBFbGVtZW50IGl0c2VsZlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5Rm9ybShmb3JtU2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgY29uc3QgJGZvcm0gPSAkKGZvcm1TZWxlY3Rvcik7XHJcbiAgICBjb25zdCAkaW5wdXRzID0gJGZvcm0uZmluZChpbnB1dFRhZ05hbWVzLmpvaW4oJywgJykpO1xyXG5cclxuICAgIC8vIE9idGFpbiBvcHRpb25zXHJcbiAgICBjb25zdCB7IGZvcm1GaWVsZENsYXNzID0gJ2Zvcm0tZmllbGQnIH0gPSBvcHRpb25zO1xyXG5cclxuICAgIC8vIENsYXNzaWZ5IGVhY2ggaW5wdXQgaW4gYSBmb3JtXHJcbiAgICAkaW5wdXRzLmVhY2goKF9fLCBpbnB1dCkgPT4ge1xyXG4gICAgICAgIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiAkZm9ybTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBpZCBmcm9tIGdpdmVuIGZpZWxkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSAkZmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRGaWVsZElkKCRmaWVsZCkge1xyXG4gICAgY29uc3QgZmllbGRJZCA9ICRmaWVsZC5wcm9wKCduYW1lJykubWF0Y2goLyhcXFsuKlxcXSkvKTtcclxuXHJcbiAgICBpZiAoZmllbGRJZCAmJiBmaWVsZElkLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIHJldHVybiBmaWVsZElkWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEluc2VydCBoaWRkZW4gZmllbGQgYWZ0ZXIgU3RhdGUvUHJvdmluY2UgZmllbGRcclxuICogQHBhcmFtIHtvYmplY3R9ICRzdGF0ZUZpZWxkIEpRdWVyeSBmaWVsZCBvYmplY3RcclxuICovXHJcbmZ1bmN0aW9uIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJHN0YXRlRmllbGQpIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSBnZXRGaWVsZElkKCRzdGF0ZUZpZWxkKTtcclxuICAgIGNvbnN0IHN0YXRlRmllbGRBdHRycyA9IHtcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICBuYW1lOiBgRm9ybUZpZWxkSXNUZXh0JHtmaWVsZElkfWAsXHJcbiAgICAgICAgdmFsdWU6ICcxJyxcclxuICAgIH07XHJcblxyXG4gICAgJHN0YXRlRmllbGQuYWZ0ZXIoJCgnPGlucHV0IC8+Jywgc3RhdGVGaWVsZEF0dHJzKSk7XHJcbn1cclxuXHJcbmNvbnN0IFZhbGlkYXRvcnMgPSB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XHJcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXHJcbiAgICAgKiBAcGFyYW0gZmllbGRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvclRleHQgZGVzY3JpYmVzIGVycm9yTWFzc2FnZSBvbiBlbWFpbCB2YWxpZGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldEVtYWlsVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yVGV4dCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWVsZCkge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSBwYXNzd29yZCBmaWVsZHNcclxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcclxuICAgICAqIEBwYXJhbSBwYXNzd29yZFNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQyU2VsZWN0b3JcclxuICAgICAqIEBwYXJhbSByZXF1aXJlbWVudHNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvclRleHRzT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gaXNPcHRpb25hbFxyXG4gICAgICovXHJcbiAgICBzZXRQYXNzd29yZFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHBhc3N3b3JkU2VsZWN0b3IsIHBhc3N3b3JkMlNlbGVjdG9yLCByZXF1aXJlbWVudHMsIHtcclxuICAgICAgICBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQsIG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0LCBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQsIG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCxcclxuICAgIH0sIGlzT3B0aW9uYWwpID0+IHtcclxuICAgICAgICBjb25zdCAkcGFzc3dvcmQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkVmFsaWRhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3B0aW9uYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uRW1wdHlQYXNzd29yZEVycm9yVGV4dCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMuYWxwaGEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMubnVtZXJpYykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHZhbC5sZW5ndGggPj0gcmVxdWlyZW1lbnRzLm1pbmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgb3B0aW9uYWwgYW5kIG5vdGhpbmcgZW50ZXJlZCwgaXQgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPcHRpb25hbCAmJiB2YWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZDJTZWxlY3RvcixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsID09PSAkcGFzc3dvcmQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdmFsaWRhdG9yLmFkZChwYXNzd29yZFZhbGlkYXRpb25zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSBwYXNzd29yZCBmaWVsZHNcclxuICAgICAqIEBwYXJhbSB7Tm9kfSB2YWxpZGF0b3JcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RvcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMuZXJyb3JTZWxlY3RvclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5maWVsZHNldFNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLmZvcm1TZWxlY3RvclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5tYXhQcmljZVNlbGVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1pblByaWNlU2VsZWN0b3JcclxuICAgICAqL1xyXG4gICAgc2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBzZWxlY3RvcnMsIHByaWNlVmFsaWRhdGlvbkVycm9yVGV4dHMgPSB7fSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcixcclxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcixcclxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yLFxyXG4gICAgICAgICAgICBtYXhQcmljZVNlbGVjdG9yLFxyXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yLFxyXG4gICAgICAgIH0gPSBzZWxlY3RvcnM7XHJcblxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxyXG4gICAgICAgIGNvbnN0IHsgb25NaW5QcmljZUVycm9yLCBvbk1heFByaWNlRXJyb3IsIG1pblByaWNlTm90RW50ZXJlZCwgbWF4UHJpY2VOb3RFbnRlcmVkLCBvbkludmFsaWRQcmljZSB9ID0gcHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cztcclxuXHJcbiAgICAgICAgdmFsaWRhdG9yLmNvbmZpZ3VyZSh7XHJcbiAgICAgICAgICAgIGZvcm06IGZvcm1TZWxlY3RvcixcclxuICAgICAgICAgICAgcHJldmVudFN1Ym1pdDogdHJ1ZSxcclxuICAgICAgICAgICAgc3VjY2Vzc0NsYXNzOiAnXycsIC8vIEtMVURHRTogRG9uJ3QgYXBwbHkgc3VjY2VzcyBjbGFzc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pblByaWNlRXJyb3IsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtaW5QcmljZVNlbGVjdG9yLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NYXhQcmljZUVycm9yLFxyXG4gICAgICAgICAgICBzZWxlY3RvcjogbWF4UHJpY2VTZWxlY3RvcixcclxuICAgICAgICAgICAgdmFsaWRhdGU6IGBtaW4tbWF4OiR7bWluUHJpY2VTZWxlY3Rvcn06JHttYXhQcmljZVNlbGVjdG9yfWAsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG1heFByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgICAgc2VsZWN0b3I6IG1heFByaWNlU2VsZWN0b3IsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBtaW5QcmljZU5vdEVudGVyZWQsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtaW5QcmljZVNlbGVjdG9yLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25JbnZhbGlkUHJpY2UsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiBbbWluUHJpY2VTZWxlY3RvciwgbWF4UHJpY2VTZWxlY3Rvcl0sXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiAnbWluLW51bWJlcjowJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFsaWRhdG9yLnNldE1lc3NhZ2VPcHRpb25zKHtcclxuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcclxuICAgICAgICAgICAgcGFyZW50OiBmaWVsZHNldFNlbGVjdG9yLFxyXG4gICAgICAgICAgICBlcnJvclNwYW46IGVycm9yU2VsZWN0b3IsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcclxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcclxuICAgICAqIEBwYXJhbSBmaWVsZFxyXG4gICAgICovXHJcbiAgICBzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JUZXh0KSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgY2xhc3NlcyBmcm9tIGRpcnR5IGZvcm0gaWYgcHJldmlvdXNseSBjaGVja2VkXHJcbiAgICAgKiBAcGFyYW0gZmllbGRcclxuICAgICAqL1xyXG4gICAgY2xlYW5VcFN0YXRlVmFsaWRhdGlvbjogKGZpZWxkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGZpZWxkQ2xhc3NFbGVtZW50ID0gJCgoYFtkYXRhLXR5cGU9XCIke2ZpZWxkLmRhdGEoJ2ZpZWxkVHlwZScpfVwiXWApKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMobm9kLmNsYXNzZXMpLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkZmllbGRDbGFzc0VsZW1lbnQuaGFzQ2xhc3Mobm9kLmNsYXNzZXNbdmFsdWVdKSkge1xyXG4gICAgICAgICAgICAgICAgJGZpZWxkQ2xhc3NFbGVtZW50LnJlbW92ZUNsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgeyBWYWxpZGF0b3JzLCBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH07XHJcbiIsIi8qXHJcbiBJbXBvcnQgYWxsIHByb2R1Y3Qgc3BlY2lmaWMganNcclxuICovXHJcbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCBSZXZpZXcgZnJvbSAnLi9wcm9kdWN0L3Jldmlld3MnO1xyXG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcclxuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XHJcbmltcG9ydCB2aWRlb0dhbGxlcnkgZnJvbSAnLi9wcm9kdWN0L3ZpZGVvLWdhbGxlcnknO1xyXG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcclxuaW1wb3J0IG1vZGFsRmFjdG9yeSwgeyBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xyXG5cclxuY29uc3QgeyBXUklURV9SRVZJRVcgfSA9IG1vZGFsVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgdGhpcy4kcmV2aWV3TGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJyk7XHJcbiAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtYnVsay1wcmljaW5nXCJdJyk7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI21vZGFsLXJldmlldy1mb3JtJylbMF07XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Nsb3NlLmZuZHRuLnJldmVhbCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB2YWxpZGF0b3I7XHJcblxyXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVcclxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKCcucHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xyXG5cclxuICAgICAgICB2aWRlb0dhbGxlcnkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJHJldmlld0Zvcm0gPSBjbGFzc2lmeUZvcm0oJy53cml0ZVJldmlldy1mb3JtJyk7XHJcblxyXG4gICAgICAgIGlmICgkcmV2aWV3Rm9ybS5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldygkcmV2aWV3Rm9ybSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdvcGVuZWQuZm5kdG4ucmV2ZWFsJywgKCkgPT4gdGhpcy5yZXZpZXdNb2RhbC5zZXR1cEZvY3VzYWJsZUVsZW1lbnRzKFdSSVRFX1JFVklFVykpO1xyXG5cclxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJldmlld0Zvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGFyaWFEZXNjcmliZVJldmlld0lucHV0cygkZm9ybSkge1xyXG4gICAgICAgICRmb3JtLmZpbmQoJ1tkYXRhLWlucHV0XScpLmVhY2goKF8sIGlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cignbmFtZScpfS1tc2dgO1xyXG5cclxuICAgICAgICAgICAgJGlucHV0LnNpYmxpbmdzKCdzcGFuJykuYXR0cignaWQnLCBtc2dTcGFuSWQpO1xyXG4gICAgICAgICAgICAkaW5wdXQuYXR0cignYXJpYS1kZXNjcmliZWRieScsIG1zZ1NwYW5JZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvZHVjdFJldmlld0hhbmRsZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy4kcmV2aWV3TGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBidWxrUHJpY2luZ0hhbmRsZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyNidWxrX3ByaWNpbmcnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XHJcbmltcG9ydCB7IENvbGxhcHNpYmxlRXZlbnRzIH0gZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcclxuaW1wb3J0IGZvcm1zIGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5vZCh7XHJcbiAgICAgICAgICAgIHN1Ym1pdDogJHJldmlld0Zvcm0uZmluZCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRyZXZpZXdzQ29udGVudCA9ICQoJyNwcm9kdWN0LXJldmlld3MnKTtcclxuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZSA9ICQoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHRoaXMuJHJldmlld3NDb250ZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TGlua0JpbmQoKTtcclxuICAgICAgICB0aGlzLmluamVjdFBhZ2luYXRpb25MaW5rKCk7XHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZVJldmlld3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9uIGluaXRpYWwgcGFnZSBsb2FkLCB0aGUgdXNlciBjbGlja3Mgb24gXCIoMTIgUmV2aWV3cylcIiBsaW5rXHJcbiAgICAgKiBUaGUgYnJvd3NlciBqdW1wcyB0byB0aGUgcmV2aWV3IHBhZ2UgYW5kIHNob3VsZCBleHBhbmQgdGhlIHJldmlld3Mgc2VjdGlvblxyXG4gICAgICovXHJcbiAgICBpbml0TGlua0JpbmQoKSB7XHJcbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKCcjcHJvZHVjdFJldmlld3MtY29udGVudCcsIHRoaXMuJHJldmlld3NDb250ZW50KTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXJldmlld0xpbmsnKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdUYWJMaW5rJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgaWYgKCEkY29udGVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxhcHNlUmV2aWV3cygpIHtcclxuICAgICAgICAvLyBXZSdyZSBpbiBwYWdpbmF0aW5nIHN0YXRlLCBkbyBub3QgY29sbGFwc2VcclxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZignI3Byb2R1Y3QtcmV2aWV3cycpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZvcmNlIGNvbGxhcHNlIG9uIHBhZ2UgbG9hZFxyXG4gICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlLnRyaWdnZXIoQ29sbGFwc2libGVFdmVudHMuY2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5qZWN0IElEIGludG8gdGhlIHBhZ2luYXRpb24gbGlua1xyXG4gICAgICovXHJcbiAgICBpbmplY3RQYWdpbmF0aW9uTGluaygpIHtcclxuICAgICAgICBjb25zdCAkbmV4dExpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XHJcbiAgICAgICAgY29uc3QgJHByZXZMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tcHJldmlvdXMgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCRuZXh0TGluay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJG5leHRMaW5rLmF0dHIoJ2hyZWYnLCBgJHskbmV4dExpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJHByZXZMaW5rLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkcHJldkxpbmsuYXR0cignaHJlZicsIGAkeyRwcmV2TGluay5hdHRyKCdocmVmJyl9ICNwcm9kdWN0LXJldmlld3NgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJWYWxpZGF0aW9uKGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yLmFkZChbe1xyXG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicmV2cmF0aW5nXCJdJyxcclxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld1JhdGluZyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0aXRsZVwiXScsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdTdWJqZWN0LFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnRleHRcIl0nLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3Q29tbWVudCxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnLndyaXRlUmV2aWV3LWZvcm0gW25hbWU9XCJlbWFpbFwiXScsXHJcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcclxuICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0VtYWlsLFxyXG4gICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcclxuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xyXG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcclxuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxyXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xyXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYWluVmlkZW8oKSB7XHJcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xyXG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcclxuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcclxuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XHJcblxyXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XHJcblxyXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=