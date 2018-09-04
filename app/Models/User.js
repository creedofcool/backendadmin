'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  projects() {
    return this.hasMany('App/Models/Project')
  }

  static getUserInfo({ request, auth }) {
    let user = auth.getUser();
    //{roles: Array(1), token: "admin", introduction: "我是超级管理员", avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif", name: "Super Admin"}
    user.roles = Array['admin', 'editor'];
    user.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
    user.name = user.username;
    const result = {
      roles: ['admin', 'editor'],
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: user.username
    }
    return result;
  }

  static getRoleRouters({ request, auth }) {
    const result = [{
        path: '/pom',
        children: [{
          path: 'poSub',
          dir: 'pom'
        }, {
          path: 'poDetail',
          dir: 'pom'
        }]
      },
      {
        path: '/goods',
        children: [{
          path: 'goodsDetail',
          dir: 'masterData/goods'
        }, {
          path: 'activityDetail',
          dir: 'masterData/goods'
        }]
      }
    ]
    const { role } = request.all();
    console.log(role);
    return result;
  }

}

module.exports = User
