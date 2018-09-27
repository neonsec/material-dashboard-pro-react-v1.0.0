const path = require('path');
const webpack = require('webpack');
const debug = require('debug');
const config = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const browserSync = require('browser-sync');
const expressApp = express();

debug.enable('app:*');

const compiler = webpack(config);
const log = debug('app:devServer');
log('Enabling webpack dev middleware.');
expressApp.use(require('webpack-dev-middleware')(compiler, {
    lazy: false,
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: false,
    logger: log.trace
    // stats: config.compiler.stats,
}));

expressApp.use(express.static('public'));
//app.use(jsxCompile('public'));
expressApp.use(bodyParser.json());
expressApp.post('/createUser', (req, res) => {
    store
        .createUser({
            username: req.body.username,
            password: req.body.password
        })
        .then(() => res.sendStatus(200))
})


expressApp.post('/get_editor_gk', (req, res) => {

    store
        .get_editor_gk(req.body.username)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/jzxttl_gk', (req, res) => {

    store
        .get_jzxttl_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/jzxttl_nh_gk', (req, res) => {

    store
        .get_jzxttl_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/jzxttl_jxsp', (req, res) => {

    store
        .get_jzxttl_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/jzxttl_nh_jxsp', (req, res) => {

    store
        .get_jzxttl_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/gkmtkbnl_nh_jxsp', (req, res) => {

    store
        .get_gkmtkbnl_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/jzxttl_chart', (req, res) => {

    store
        .get_jzxttl({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/jzxttl_nh_chart', (req, res) => {

    store
        .get_jzxttl_nh({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.get('/get_table_jxztpj', (req, res) => {
    store
        .get_table_jxztpj()
        .then(({responseJson}) => {
            if (responseJson.success) {

                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.get('/get_table_qwdttlswrs', (req, res) => {
    store
        .get_table_qwdttlswrs(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/qwdttlswrs', (req, res) => {

    store
        .insert_into_table_qwdttlswrs(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/qwdttlswrs', (req, res) => {

    store
        .update_table_qwdttlswrs(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/qwdttlswrs', (req, res) => {

    store
        .delete_from_table_qwdttlswrs(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})

expressApp.get('/get_table_lsgkdj', (req, res) => {
    store
        .get_table_lsgkdj(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/lsgkdj', (req, res) => {

    store
        .insert_into_table_lsgkdj(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/lsgkdj', (req, res) => {

    store
        .update_table_lsgkdj(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/lsgkdj', (req, res) => {

    store
        .delete_from_table_lsgkdj(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})

expressApp.get('/get_table_ddsr', (req, res) => {
    store
        .get_table_ddsr(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/ddsr', (req, res) => {

    store
        .insert_into_table_ddsr(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/ddsr', (req, res) => {

    store
        .update_table_ddsr(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/ddsr', (req, res) => {

    store
        .delete_from_table_ddsr(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})

expressApp.get('/get_table_cbzgpjts', (req, res) => {
    store
        .get_table_cbzgpjts(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/cbzgpjts', (req, res) => {

    store
        .insert_into_table_cbzgpjts(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/cbzgpjts', (req, res) => {

    store
        .update_table_cbzgpjts(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/cbzgpjts', (req, res) => {

    store
        .delete_from_table_cbzgpjts(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})

expressApp.get('/get_table_mtnlsyx', (req, res) => {
    store
        .get_table_mtnlsyx(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/mtnlsyx', (req, res) => {

    store
        .insert_into_table_mtnlsyx(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/mtnlsyx', (req, res) => {

    store
        .update_table_mtnlsyx(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/mtnlsyx', (req, res) => {

    store
        .delete_from_table_mtnlsyx(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})

expressApp.get('/get_table_bmaxttl', (req, res) => {
    store
        .get_table_bmaxttl(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/bmaxttl', (req, res) => {
    store
        .insert_into_table_bmaxttl(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
               res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/bmaxttl', (req, res) => {

    store
        .update_table_bmaxttl(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/bmaxttl', (req, res) => {

    store
        .delete_from_table_bmaxttl(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})

expressApp.get('/get_table_dckbsl', (req, res) => {
    store
        .get_table_dckbsl(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/dckbsl', (req, res) => {

    store
        .insert_into_table_dckbsl(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/dckbsl', (req, res) => {

    store
        .update_table_dckbsl(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/dckbsl', (req, res) => {

    store
        .delete_from_table_dckbsl(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})
expressApp.get('/get_table_mtkbnl', (req, res) => {
    store
        .get_table_mtkbnl(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/mtkbnl', (req, res) => {

    store
        .insert_into_table_mtkbnl(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/mtkbnl', (req, res) => {

    store
        .update_table_mtkbnl(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/mtkbnl', (req, res) => {

    store
        .delete_from_table_mtkbnl(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})
expressApp.get('/get_table_jzxttl', (req, res) => {

    store
        .get_table_jzxttl(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/jzxttl', (req, res) => {


    store
        .insert_into_table_jzxttl(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/jzxttl', (req, res) => {


    store
        .update_table_jzxttl(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/jzxttl', (req, res) => {


    store
        .delete_from_table_jzxttl(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
        })
})

expressApp.post('/hwttl', (req, res) => {

    //res.json({"foo": "bar1234"});
    //
    //res.json({"foo": "bar1234"});
    store
        .insert_into_table_hwttl(req.body)
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.put('/hwttl', (req, res) => {


    //res.json({"foo": "bar1234"});
    //
    //res.json({"foo": "bar1234"});

    store
        .update_table_hwttl(
            req.body
        )
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            //520 means database access failure.
            else res.sendStatus(520)
        })
})

expressApp.delete('/hwttl', (req, res) => {




    //res.json({"foo": "bar1234"});
    //
    //res.json({"foo": "bar1234"});
    store
        .delete_from_table_hwttl(
            req.body
        )
        .then(({delCount}) => {


            res.json({delCount: delCount});
            // if (responseJson.success) {
            //   
            //   res.json(responseJson);
            // }
            // else{
            //   
            //   res.sendStatus(401)};
        })
    //res.sendStatus(500);

})


expressApp.post('/mtnlsyd_metric', (req, res) => {

    store
        .get_mtnlsyd_metric({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/mtnlsyd_nh_metric', (req, res) => {

    store
        .get_mtnlsyd_nh_metric({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})



expressApp.post('/login', (req, res) => {
    store
        .authenticate({
            username: req.body.username,
            password: req.body.password
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/register', (req, res) => {

    store
        .createUser({
            username: req.body.username,
            password: req.body.password,
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.get('/get_table_hwttl', (req, res) => {

    store
        .get_table_hwttl(req.query.user)
        .then(({responseJson}) => {
            if (responseJson.success) {


                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/viewStat', (req, res) => {

    store
        .get_viewStat({
            viewStat: req.body.viewStat
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/lsgkdj_chart', (req, res) => {

    store
        .get_lsgkdj({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/lsgkdj_nh_chart', (req, res) => {

    store
        .get_lsgkdj_nh({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/lsgkdj_year', (req, res) => {

    store
        .get_lsgkdj_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/lsgkdj_nh_year', (req, res) => {

    store
        .get_lsgkdj_nh_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/qwdttlswrs_chart', (req, res) => {

    store
        .get_qwdttlswrs({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/qwdttlswrs_nh_chart', (req, res) => {

    store
        .get_qwdttlswrs_nh({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/qwdttlswrs_year', (req, res) => {

    store
        .get_qwdttlswrs_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/qwdttlswrs_nh_year', (req, res) => {

    store
        .get_qwdttlswrs_nh_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/overall_metric_for_trend', (req, res) => {

    store
        .get_overall_metric_for_trend({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/gkjxzdf', (req, res) => {

    store
        .get_gkjxzdf({
            year: req.body.year,
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                //
                //
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/gkjxzdf_year', (req, res) => {

    store
        .get_gkjxzdf_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/gkjxzdf_gk', (req, res) => {

    store
        .get_gkjxzdf_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/ddsr_chart', (req, res) => {

    store
        .get_ddsr({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/ddsr_nh_chart', (req, res) => {

    store
        .get_ddsr_nh({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/overall_metric_rank', (req, res) => {
    //
    store
        .get_overall_metric_rank({
            year: req.body.year,
            gk: req.body.gk,
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/overall_metric_for_order', (req, res) => {
    //
    store
        .get_overall_metric_for_order({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/ddsr_year', (req, res) => {

    store
        .get_ddsr_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/ddsr_nh_year', (req, res) => {

    store
        .get_ddsr_nh_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/yhgkmtkbnl_syx', (req, res) => {

    store
        .get_yhgkmtkbnl_syx({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/gkmtkbnl_nh_syx', (req, res) => {

    store
        .get_gkmtkbnl_nh_syx({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

// expressApp.post('/yhgkjxpjldt', (req, res) => {
//   store
//     .authenticate({
//       username: req.body.username,
//       password: req.body.password
//     })
//     .then(({ responseJson }) => {
//       if (responseJson.success) {
//         res.json(responseJson);
//         res.sendStatus(200);
//       }
//       else res.sendStatus(401)
//     })
// })

expressApp.post('/yhgkhwttl', (req, res) => {

    store
        .get_yhgkhwttl({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/gkhwttl_nh', (req, res) => {

    store
        .get_gkhwttl_nh({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})




expressApp.post('/yhgkhwttl_gk', (req, res) => {

    store
        .get_yhgkhwttl_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/gkhwttl_nh_gk', (req, res) => {

    store
        .get_gkhwttl_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/yhgkhwttl_jxsp', (req, res) => {

    store
        .get_yhgkhwttl_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/gkhwttl_nh_jxsp', (req, res) => {

    store
        .get_gkhwttl_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})




expressApp.post('/yhgkhwttl_year', (req, res) => {

    store
        .get_yhgkhwttl_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})



expressApp.post('/gkhwttl_nh_year', (req, res) => {

    store
        .get_gkhwttl_nh_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/cbzgpjts_chart', (req, res) => {

    store
        .get_cbzgpjts({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/cbzgpjts_year', (req, res) => {

    store
        .get_cbzgpjts_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/mtnlsyd', (req, res) => {

    store
        .get_mtnlsyd({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/mtnlsyd_nh', (req, res) => {

    store
        .get_mtnlsyd_nh({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/mtnlsyd_year', (req, res) => {

    store
        .get_mtnlsyd_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/mtnlsyd_nh_year', (req, res) => {

    store
        .get_mtnlsyd_nh_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/dckbsl_chart', (req, res) => {

    store
        .get_dckbsl({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/dckbsl_year', (req, res) => {

    store
        .get_dckbsl_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/jzxttl_year', (req, res) => {

    store
        .get_jzxttl_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/jzxttl_nh_year', (req, res) => {

    store
        .get_jzxttl_nh_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/yhgkmtkbnl_max_bw', (req, res) => {

    store
        .get_yhgkmtkbnl_max_bw({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/gkmtkbnl_nh_max_bw', (req, res) => {

    store
        .get_gkmtkbnl_nh_max_bw({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/yhgkmtkbnl_max_bw_year', (req, res) => {

    store
        .get_yhgkmtkbnl_max_bw_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/gkmtkbnl_nh_max_bw_year', (req, res) => {

    store
        .get_gkmtkbnl_nh_max_bw_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/bmaxttl_f_jzx_metric', (req, res) => {

    store
        .get_bmaxttl_f_jzx_metric({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/bmaxttl_year', (req, res) => {

    store
        .get_bmaxttl_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})



expressApp.post('/bmaxttl_nh_year', (req, res) => {

    store
        .get_bmaxttl_nh_year()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/bmaxttl_jzx_metric', (req, res) => {

    store
        .get_bmaxttl_jzx_metric({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/bmaxttl_total_metric', (req, res) => {

    store
        .get_bmaxttl_total_metric({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/bmaxttl_nh_total_metric', (req, res) => {

    store
        .get_bmaxttl_nh_total_metric({
            year: req.body.year
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/bmaxttl_zbwcd', (req, res) => {
    store.get_bmaxttl_zbwcd({year: req.body.year})
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        })
})

expressApp.get('/update_radar', (req, res) => {
    store.update_radar()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        })
})

expressApp.get('*', (req, res) => {
    res.redirect('/');
})

var port = 4000;
var hostname = 'localhost';

expressApp.listen(port, hostname, (err) => {
    if (err) {
        log(err);
        return;
    }
    log(`Harbour Server is now running at http://${hostname}:${port}.`);
});


















expressApp.post('/dckbsl_gk', (req, res) => {

    store
        .get_dckbsl_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/dckbsl_nh_gk', (req, res) => {

    store
        .get_dckbsl_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/dckbsl_jxsp', (req, res) => {

    store
        .get_dckbsl_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})





expressApp.post('/bmaxttl_gk', (req, res) => {

    store
        .get_bmaxttl_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})



expressApp.post('/bmaxttl_nh_gk', (req, res) => {

    store
        .get_bmaxttl_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/gkmtkbnl_nh_gk', (req, res) => {

    store
        .get_gkmtkbnl_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})
expressApp.post('/bmaxttl_jxsp', (req, res) => {

    store
        .get_bmaxttl_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})



expressApp.post('/bmaxttl_nh_jxsp', (req, res) => {

    store
        .get_bmaxttl_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})










expressApp.post('/mtnlsyd_gk', (req, res) => {

    store
        .get_mtnlsyd_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/mtnlsyd_nh_gk', (req, res) => {

    store
        .get_mtnlsyd_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/mtnlsyd_jxsp', (req, res) => {

    store
        .get_mtnlsyd_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/mtnlsyd_nh_jxsp', (req, res) => {

    store
        .get_mtnlsyd_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})




expressApp.post('/cbzgpjts_gk', (req, res) => {

    store
        .get_cbzgpjts_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/cbzgpjts_jxsp', (req, res) => {

    store
        .get_cbzgpjts_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})







expressApp.post('/ddsr_gk', (req, res) => {

    store
        .get_ddsr_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/ddsr_nh_gk', (req, res) => {

    store
        .get_ddsr_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/ddsr_jxsp', (req, res) => {

    store
        .get_ddsr_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})


expressApp.post('/ddsr_nh_jxsp', (req, res) => {

    store
        .get_ddsr_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})






expressApp.post('/lsgkdj_gk', (req, res) => {

    store
        .get_lsgkdj_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/lsgkdj_nh_gk', (req, res) => {

    store
        .get_lsgkdj_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/lsgkdj_jxsp', (req, res) => {

    store
        .get_lsgkdj_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})

expressApp.post('/lsgkdj_nh_jxsp', (req, res) => {

    store
        .get_lsgkdj_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
})









expressApp.post('/qwdttlswrs_gk', (req, res) => {

    store
        .get_qwdttlswrs_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
});


expressApp.post('/qwdttlswrs_nh_gk', (req, res) => {

    store
        .get_qwdttlswrs_nh_gk()
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
});

expressApp.post('/qwdttlswrs_jxsp', (req, res) => {

    store
        .get_qwdttlswrs_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
});
expressApp.post('/qwdttlswrs_nh_jxsp', (req, res) => {

    store
        .get_qwdttlswrs_nh_jxsp({
            gk: req.body.gk
        })
        .then(({responseJson}) => {
            if (responseJson.success) {
                res.json(responseJson);
                res.sendStatus(200);
            }
            else res.sendStatus(401)
        })
});




var bsPort = 4000;
var bsUI = 4040;
var bsWeInRe = 4444;

// browserSync.init({
//   proxy: `${hostname}:${port}`,
//   port: bsPort,
//   ui: {
//     port: bsUI,
//     weinre: { port: bsWeInRe },
//   },
// });