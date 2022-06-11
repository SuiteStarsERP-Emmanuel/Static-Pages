define('CT.COMM.Backbone.FormView', [
  'Backbone',
  'Backbone.FormView',
  'jQuery',
  'Utils',
  'underscore'
], function (Backbone, BackboneFormView, $, Utils, _) {
  'use strict';

  return {
    loadModule: function () {
      function buttonSubmitDone(savingForm) {
        savingForm.find('[type="submit"]').each(function () {
          var element = $(this);
          element.attr('disabled', false);
          element.text(element.data('default-text'));
        });
      }

      _.extend(BackboneFormView, {
        saveForm: function (e, model, props) {
          e.preventDefault();

          // Add validate method into the view.model
          Backbone.Validation.bind(this);

          model = model || this.model;

          this.$savingForm = $(e.target).closest('form');
          this.isSavingForm = true;

          if (this.$savingForm.length) {
            // and hides reset buttons
            this.$savingForm
              .find('input[type="reset"], button[type="reset"]')
              .hide();
          }

          this.hideError();

          var self = this;
          var options = self.selector ? { selector: self.selector } : {};
          // Returns the promise of the save action of the model
          var result = model.save(
            props || this.$savingForm.serializeObject(),
            _.extend(
              {
                wait: true,

                forceUpdate: false,

                // Hides error messages, re enables buttons and triggers the
                // save event if we are in a modal this also closes it
                success: function (model, response) {
                  if (self.inModal && self.$containerModal) {
                    self.$containerModal
                      .removeClass('fade')
                      .modal('hide')
                      .data('bs.modal', null);
                  }

                  if (self.$savingForm.length) {
                    self.hideError(self.$savingForm);
                    buttonSubmitDone(self.$savingForm);

                    model.trigger('save', model, response);
                  }
                  model.trigger('saveCompleted');
                },

                // Re enables all button and shows an error message
                error: function (model, response) {
                  buttonSubmitDone(self.$savingForm);

                  if (response.responseJSON) {
                    self.transformResponseText(response);
                    model.trigger('error', response.responseJSON || {});
                  }
                }
              },
              options
            )
          );

          if (result === false) {
            this.$savingForm
              .find('input[type="reset"], button[type="reset"]')
              .show();
            this.$savingForm
              .find('*[type=submit], *[type=reset]')
              .attr('disabled', false);
          }

          return result;
        }
      });
    }
  };
});
