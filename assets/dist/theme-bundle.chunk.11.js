(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/brand.js":
/*!**********************************!*\
  !*** ./assets/js/theme/brand.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Brand; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var Brand = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Brand, _CatalogPage);

  function Brand(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Brand.prototype;

  _proto.onReady = function onReady() {
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context.urls);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.brandProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'brand/product-listing',
        sidebar: 'brand/sidebar'
      },
      config: {
        shop_by_brand: true,
        brand: {
          products: {
            limit: productsPerPage
          }
        }
      },
      showMore: 'brand/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Brand;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYnJhbmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQnJhbmQiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJvblJlYWR5IiwiY29tcGFyZVByb2R1Y3RzIiwidXJscyIsIiQiLCJsZW5ndGgiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwib24iLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJicmFuZFByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJjb25maWciLCJzaG9wX2J5X2JyYW5kIiwiYnJhbmQiLCJwcm9kdWN0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiSlNPTiIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxLOzs7QUFDakIsaUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsb0NBQU1BLE9BQU47QUFDQSxVQUFLQyxvQkFBTCxHQUE0QkMsMEdBQTJCLENBQUNGLE9BQUQsQ0FBdkQ7QUFGaUI7QUFHcEI7Ozs7U0FFREcsTyxHQUFBLG1CQUFVO0FBQ05DLDRFQUFlLENBQUMsS0FBS0osT0FBTCxDQUFhSyxJQUFkLENBQWY7O0FBRUEsUUFBSUMsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JDLE1BQXBCLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2hDLFdBQUtDLGlCQUFMO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS0MsY0FBTCxHQUFzQixLQUFLQSxjQUFMLENBQW9CQyxJQUFwQixDQUF5QixJQUF6QixDQUF0QjtBQUNBQyxzRUFBSyxDQUFDQyxFQUFOLENBQVMsa0JBQVQsRUFBNkIsS0FBS0gsY0FBbEM7QUFDSDtBQUNKLEc7O1NBRURELGlCLEdBQUEsNkJBQW9CO0FBQUEsZ0NBT1osS0FBS1Asb0JBUE87QUFBQSxRQUVVWSxlQUZWLHlCQUVaQyxvQkFGWTtBQUFBLFFBR1VDLGVBSFYseUJBR1pDLG9CQUhZO0FBQUEsUUFJV0Msa0JBSlgseUJBSVpDLHFCQUpZO0FBQUEsUUFLV0Ms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Q0FBdEI7QUFDQSxNQUFNZSxlQUFlLEdBQUdaLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUSxnQkFBZ0IsQ0FBQ1osWUFBRCxDQUE1QixFQUE0Q2dCLEdBQTVDLENBQWdELFVBQUFDLEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxHQUFWLEVBQWVDLEdBQWYsRUFBSjtBQUFBLEdBQW5ELENBQXhCO0FBRUEsU0FBT0osZUFBZSxDQUFDSyxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1KLEdBQU4sRUFBV1gsQ0FBWCxFQUFpQjtBQUMzQ2UsT0FBRyxDQUFDSixHQUFELENBQUgsR0FBV0osYUFBYSxDQUFDUCxDQUFELENBQXhCO0FBQ0EsV0FBT2UsR0FBUDtBQUNILEdBSE0sRUFHSixFQUhJLENBQVA7QUFJSCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xyXG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xyXG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XHJcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJhbmQgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XHJcblxyXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcclxuICAgICAgICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcclxuICAgICAgICAgICAgcHJpY2VfbWluX25vdF9lbnRlcmVkOiBtaW5QcmljZU5vdEVudGVyZWQsXHJcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxyXG4gICAgICAgICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcclxuICAgICAgICB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcclxuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RzUGVyUGFnZSA9IHRoaXMuY29udGV4dC5icmFuZFByb2R1Y3RzUGVyUGFnZTtcclxuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnYnJhbmQvcHJvZHVjdC1saXN0aW5nJyxcclxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdicmFuZC9zaWRlYmFyJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBzaG9wX2J5X2JyYW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYnJhbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaG93TW9yZTogJ2JyYW5kL3Nob3ctbW9yZScsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xyXG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xyXG5cclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcclxuICAgICAgICAgICAgICAgIG9uTWF4UHJpY2VFcnJvcixcclxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcclxuICAgICAgICAgICAgICAgIG9uSW52YWxpZFByaWNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xyXG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XHJcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XHJcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcclxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XHJcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xyXG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XHJcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcclxuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==