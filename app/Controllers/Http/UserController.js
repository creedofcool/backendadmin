'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User');

class UserController {
    async login({ request, auth }) {
        const { email, password } = request.all();
        console.log(email, password);
        //try {
        const token = await auth.attempt(email, password);
        if (token) {
            return token;
        } else {
            token = null;
        }
        //  } catch (e) {
        //     console.log(e.name);
        // }

        return token;
    }

    async register({ request }) {
        const { email, password } = request.all();
        console.log(email, password);
        const validation = await validateAll(request.all(), {
          email: 'required|unique:users,email',
          password: 'required'
        });

        if(validation.fails()) {
          return validation.messages()
        }

        const user = await User['create']({
            email,
            password,
            username: email,
        });
        return this.login(...arguments);
    }

    async uni({ request, auth }) {
        const { db, method } = request.all();
        const { email, password } = request.all()
        console.log(db, method);
        const db1 = use('App/Models/' + db);
        const result = await db1[method]({
          // email,
          // password,
          // username: email,
          request,
          auth
        });
        return result;
        //return this.login(...arguments);
    }
}

module.exports = UserController
