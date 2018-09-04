'use strict'

class AllInOnController {
  async index({ request, auth }) {
    const { db, action } = request.all();
    console.log('request: ', db, action);
    const obj = use('App/Models/' + db);
    const result = await obj[action]({
            request,
            auth,
        });
    return result;
  }
}

module.exports = AllInOnController
