'use strict';

let http   = require('http');
let router = require('koa-router')();
let UserModel = require('../models/user');


router.get('/users', function* () {
    try {
        let data = yield UserModel.find();

        this.body = {
            ok: true,
            data: data
        };
    } catch (e) {
        this.status = 404;
        this.body = {
            ok: false,
            error: http.STATUS_CODES[404]
        };
    }
});


router.get('/users/:id', function* () {
    try {
        let data = yield UserModel.findById(this.params.id);

        this.body = {
            ok: true,
            data: data
        };
    } catch (e) {
        this.status = 404;
        this.body = {
            ok: false,
            error: http.STATUS_CODES[404]
        };
    }
});


router.post('/users', function* () {
    let user = new UserModel(this.request.body);

    try {
        let data = yield user.save();

        this.body = {
            ok: true,
            data: data
        }
    } catch(e) {
        this.body = {
            ok: false,
            error: e.message
        };
    }

});


router.delete('/users/:id', function* () {
    try {
        let data = yield UserModel.findById(this.params.id).remove();

        /*
            result.result:
            {
              "ok": 1,
              "n": 0
            }
         */
        if (data.result.n === 0) {
            this.throw();
        }

        this.body = {
            ok: true,
            data: data
        };
    } catch (e) {
        this.status = 404;
        this.body = {
            ok: false,
            error: http.STATUS_CODES[404]
        };
    }
});


module.exports = router;