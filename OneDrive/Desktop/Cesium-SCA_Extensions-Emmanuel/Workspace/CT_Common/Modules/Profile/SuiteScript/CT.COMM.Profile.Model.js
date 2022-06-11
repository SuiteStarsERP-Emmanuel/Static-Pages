define('CT.COMM.Profile.Model', [
  'Profile.Model',
  'SC.Models.Init',
  'underscore'
], function (ProfileModel, ModelsInit, _) {
  _.extend(ProfileModel, {
    update: _.wrap(ProfileModel.update, function (fn) {
      var argArray = _.toArray(arguments).slice(1);

      fn.apply(this, argArray);

      var data = argArray[0];

      if (data.customfields) {
        var qLinks = data.customfields['custentity_cesi_web_myquicklinks_json'];

        if (!qLinks) {
          qLinks = '';
        }

        data.customfields['custentity_cesi_web_myquicklinks_json'] =
          JSON.stringify(qLinks);

        ModelsInit.customer.updateProfile({
          internalid: parseInt(nlapiGetUser(), 10),
          customfields: data.customfields
        });
      }
    })
  });
});
