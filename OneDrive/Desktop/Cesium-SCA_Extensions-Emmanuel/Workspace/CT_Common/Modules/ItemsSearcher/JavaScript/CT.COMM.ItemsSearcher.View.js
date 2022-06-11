define('CT.COMM.ItemsSearcher.View', [
  'ItemsSearcher.View',
  'ItemsSearcher.Utils',
  'underscore'
], function (ItemsSearcherView, ItemsSearcherUtils, _) {
  'use strict';

  return {
    loadModule: function () {
      _.extend(ItemsSearcherView.prototype, {
        loadSuggestionItemsSource: function (query, callback, callbackAsync) {
          var self = this;

          self.options.ajaxDone = false;
          self.options.results = {};
          self.options.query = ItemsSearcherUtils.formatKeywords(query);

          this.collection = new this.options.collection(
            [],
            this.options.collectionOptions
          );

          if (self.options.query.length >= self.options.minLength) {
            self.options.labels = ['see-all-' + self.options.query];
            callback(self.options.labels);
          }

          self.collection
            .fetch(
              {
                data: {
                  q: String(self.options.query).trim(),
                  sort: self.options.sort,
                  limit: self.options.limit,
                  offset: 0
                },
                killerId: _.uniqueId('ajax_killer_')
              },
              {
                silent: true
              }
            )
            .done(function () {
              self.collection =
                self.postItemsSuggestionObtained.executeAll(
                  self.collection,
                  self.options
                ) || self.collection;

              self.options.ajaxDone = true;
              self.options.labels = self.options.showSeeAll
                ? self
                    .getItemIds(self.collection)
                    .concat(['see-all-' + self.options.query])
                : self.getItemIds(self.collection);

              if (!self.options.labels.length) {
                self.options.labels = ['see-all-' + self.options.query];
              }

              callbackAsync(self.options.labels);

              self.selectFirstIfRequire();
            });
        }
      });
    }
  };
});
