define('CT.COMM.GlobalViews.LangSelector.View', [
  'ct_comm_global_views_lang_selector.tpl',
  'Backbone',
  'Configuration',
  'Session',
  'Utils',
  'jQuery',
  'underscore'
], function (
  global_views_lang_selector_tpl,
  Backbone,
  Configuration,
  Session,
  Utils,
  $,
  _
) {
  'use strict';

  return Backbone.View.extend({
    template: global_views_lang_selector_tpl,

    events: {
      'change select[data-toggle="lang-selector"]': 'setLanguage',
      'click select[data-toggle="lang-selector"]': 'selectLangClick'
    },

    // @method selectLangClick @param {HTMLEvent} e
    selectLangClick: function (e) {
      e.stopPropagation();
    },

    // @method setLang @param {HTMLEvent} e
    setLanguage: function (e) {
      var langLocale = $(e.target).val(),
        selectedLang = _.find(
          SC.ENVIRONMENT.availableLanguages,
          function (language) {
            return language.locale === langLocale;
          }
        );

      window.location.href = Utils.addParamsToUrl(
        Session.get('touchpoints.' + Configuration.get('currentTouchpoint')),
        {
          lang: selectedLang.locale,
          cur: SC.ENVIRONMENT.currentCurrency.code
        }
      );
    },

    getContext: function () {
      var selectedLanguage = null;
      var availableLanguages = _.map(
        SC.ENVIRONMENT.availableLanguages,
        function (language) {
          if (SC.ENVIRONMENT.currentLanguage.locale === language.locale) {
            selectedLanguage = language.name;
          }

          return {
            locale: language.locale,
            title: language.name,
            isSelected:
              SC.ENVIRONMENT.currentLanguage.locale === language.locale
          };
        }
      );

      return {
        showLanguageSelector:
          SC.ENVIRONMENT.availableLanguages &&
          SC.ENVIRONMENT.availableLanguages.length > 0,
        availableLanguages: availableLanguages || [],
        selectedLanguage: selectedLanguage
      };
    }
  });
});
