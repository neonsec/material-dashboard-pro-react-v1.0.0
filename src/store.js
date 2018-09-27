const crypto = require('crypto');
const knex = require('knex')(require('./knexfile'));

//import {currentUsername} from "./variables/username";
// const mysql = require('mysql2/promise');
// const bluebird = require('bluebird');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'wyl1107_',
//   database: 'harbour'
// });

//const connection =  mysql.createConnection({host:'localhost', user: 'root', password: 'wyl1107_',database: 'harbour', Promise: bluebird});

module.exports = {

    async createUser({username, password, gk}) {
        const {salt, hash} = saltHashPassword({password});
        const user = await knex('user').where({username});

        if (user.length > 0) {
            responseJson = {
                success: false
            };
            return {responseJson};
        }
        const row = await knex('user').insert({
            salt,
            encrypted_password: hash,
            username,
            gk
            // role,
            // gk
        });


        responseJson = {
            success: true,
            row
        };
        return {responseJson};
    },

    authenticate({username, password}) {

        return knex('user').where({username})
            .then(([user]) => {
                let responseJson = {
                    user: {
                        id: null,
                        name: null,
                        token: null
                    },
                    success: false
                };
                if (!user) return {responseJson}
                const {hash} = saltHashPassword({
                    password,
                    salt: user.salt
                })
                if (hash === user.encrypted_password) {
                    responseJson = {
                        user: {
                            id: user.id,
                            name: user.username,
                            token: "fake-jwt-token"
                        },
                        success: true
                    };
                }

                return {responseJson};
            })
    },
    get_table_qwdttlswrs(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('qwdttlswrs').whereIn('gk', gk_list)
                .then((row) => {
                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },


    get_editor_gk(user) {
        console.log(user);
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            let responseJson = {
                gk: null,
                success: false
            };
            if (!row) {
                return {responseJson}
            }
            gk_list = row[0].gk.split(",");
            responseJson = {
                gk: gk_list,
                success: true
            };
            return {responseJson};
        });
    },


    get_table_jxztpj() {
        return knex.select('*').from('overall_metric')
            .then((row) => {
                let responseJson = {
                    rows: null,
                    success: false
                };
                if (!row) {
                    return {responseJson}
                }
                responseJson = {
                    rows: row,
                    success: true
                };
                return {responseJson};
            })
    },
    delete_from_table_qwdttlswrs(ids) {

        return delete_from_table('qwdttlswrs', ids)
    },
    update_table_qwdttlswrs(row) {
        return update_table('call update_qwdttlswrs(?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].qwdttlswrs])
    },
    insert_into_table_qwdttlswrs(row) {

        return insert_into_table('call insert_qwdttlswrs(?,?,?)', [row.year, row.gk, row.qwdttlswrs])
    },
    get_table_lsgkdj(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('lsgkdj').whereIn('gk', gk_list)
                .then((row) => {

                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    delete_from_table_lsgkdj(ids) {

        return delete_from_table('lsgkdj', ids)
    },
    update_table_lsgkdj(row) {
        return update_table('call update_lsgkdj(?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].lsgkdj])

    },
    insert_into_table_lsgkdj(row) {

        return insert_into_table('call insert_lsgkdj(?,?,?)', [row.year, row.gk, row.lsgkdj])
    },

    get_table_ddsr(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('ddsr').whereIn('gk', gk_list)
                .then((row) => {

                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    delete_from_table_ddsr(ids) {

        return delete_from_table('ddsr', ids)
    },
    update_table_ddsr(row) {
        return update_table('call update_ddsr(?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].ddsr])

    },
    insert_into_table_ddsr(row) {
        return insert_into_table('call insert_ddsr(?,?,?)', [row.year, row.gk, row.ddsr])
    },
    get_table_cbzgpjts(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('cbzgpjts').whereIn('gk', gk_list)
                .then((row) => {

                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    delete_from_table_cbzgpjts(ids) {

        return delete_from_table('cbzgpjts', ids)
    },
    update_table_cbzgpjts(row) {
        return update_table('call update_cbzgpjts(?,?,?,?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].wmc_pjqdts, row[0].nmc_pjqdts, row[0].wm_hwttl, row[0].nm_hwttl])

    },
    insert_into_table_cbzgpjts(row) {
        return insert_into_table('call insert_cbzgpjts(?,?,?,?,?,?)', [row.year, row.gk, row.wmc_pjqdts, row.nmc_pjqdts, row.wm_hwttl, row.nm_hwttl])
    },
    get_table_bmaxttl(user) {
        //return knex.select('*').from('bmaxttl')
        //knex('user').where({username: user}).select('gk');
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('bmaxttl').whereIn('gk', gk_list)
                .then((row) => {
                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
        //gk_list = ['大连港','烟台港'];

    },
    async get_bmaxttl_zbwcd({year}) {
        let row = await knex.select('gk', 'zbwcd')
            .from('bmaxttl')
            .where({year: year})
            .orderBy('zbwcd');
        let responseJson = {
            bmaxttl_zbwcd: null,
            success: false
        };
        if (!row) {
            return {responseJson}
        }
        responseJson = {
            bmaxttl_zbwcd: row,
            success: true
        };
        return {responseJson};

    },
    get_table_mtnlsyx(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('mtnlsyx').whereIn('gk', gk_list)
                .then((row) => {

                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    delete_from_table_mtnlsyx(ids) {

        return delete_from_table('mtnlsyx', ids)
    },
    update_table_mtnlsyx(row) {
        return update_table('call update_mtnlsyx(?,?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].mttgnl, row[0].hwttl])

    },
    insert_into_table_mtnlsyx(row) {
        return insert_into_table('call insert_mtnlsyx(?,?,?,?)', [row.year, row.gk, row.mttgnl, row.hwttl])
    },
    delete_from_table_bmaxttl(ids) {

        return delete_from_table('bmaxttl', ids)
    },
    update_table_bmaxttl(row) {
        return update_table('call update_bmaxttl(?,?,?,?,?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].jzxbwcd, row[0].f_jzxbwcd, row[0].jzxttl_xs, row[0].jzxttl_zl, row[0].f_jzxttl_zl])

    },
    insert_into_table_bmaxttl(row) {
        return insert_into_table('call insert_bmaxttl(?,?,?,?,?,?,?)', [row.year,row.gk,row.jzxbwcd,row.f_jzxbwcd,row.jzxttl_xs,row.jzxttl_zl,row.f_jzxttl_zl]);
        /*return knex.raw('call insert_bmaxttl(?,?,?,?,?,?,?)', [row.year,row.gk,row.jzxbwcd,row.f_jzxbwcd,row.jzxttl_xs,row.jzxttl_zl,row.f_jzxttl_zl])
            .then((ret) => {
                //console.log(ret[0][0][0]);
                let row = ret[0][0][0];
                let responseJson = {
                    row: null,
                    success: false
                };
                if (!row) {
                    return {responseJson}
                }
                responseJson = {
                    row: row,
                    success: true
                };
                return {responseJson};
            }).catch(e => console.log(e))*/

    },

    get_table_dckbsl(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('dckbsl').whereIn('gk', gk_list)
                .then((row) => {

                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    delete_from_table_dckbsl(ids) {

        return delete_from_table('dckbsl', ids)
    },
    update_table_dckbsl(row) {
        return update_table('call update_dckbsl(?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].dckbsl])

    },
    insert_into_table_dckbsl(row) {

        return insert_into_table('call insert_dckbsl(?,?,?)', [row.year, row.gk, row.dckbsl])
    },
    get_table_mtkbnl(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('gkmtkbnl').whereIn('gk', gk_list)
                .then((row) => {

                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    delete_from_table_mtkbnl(ids) {

        return delete_from_table('gkmtkbnl', ids)
    },
    update_table_mtkbnl(row) {
        return update_table('call update_gkmtkbnl(?,?,?,?,?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].mt_bw, row[0].yy_bw, row[0].jsks_bw, row[0].jzx_bw, row[0].other_bw])
    },
    insert_into_table_mtkbnl(row) {
        return insert_into_table('call insert_gkmtkbnl(?,?,?,?,?,?,?)', [row.year, row.gk, row.mt_bw, row.yy_bw, row.jsks_bw, row.jzx_bw, row.other_bw])
    },
    get_table_jzxttl(user) {
        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row) => {
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list) => {
            return knex.select('*').from('yhgkjzxttl').whereIn('gk', gk_list)
                .then((row) => {
                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    delete_from_table_jzxttl(ids) {

        return delete_from_table('yhgkjzxttl', ids)
    },
    update_table_jzxttl(row) {
        return update_table('call update_yhgkjzxttl(?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].jzxttl])

    },
    insert_into_table_jzxttl(row) {
        return insert_into_table('call insert_yhgkjzxttl(?,?,?)', [row.year, row.gk, row.jzxttl])
    },
    delete_from_table_hwttl(ids) {
        return delete_from_table('yhgkhwttl', ids)
    },
    update_table_hwttl(row) {
        return update_table('call update_yhgkhwttl(?,?,?,?)', [getRowIds(row), row[0].year, row[0].gk, row[0].gkhwttl])
    },

    insert_into_table_hwttl({year, gk, gkhwttl}) {

        return insert_into_table('call insert_yhgkhwttl(?,?,?)', [year, gk, gkhwttl])
    },


    get_viewStat({viewStat}) {

        return knex.select('*').from({viewStat})
            .then((row) => {

                let responseJson = {
                    viewStat: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    viewStat: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_table_hwttl(user) {

        let gk_list = [];
        return knex('user').where({username: user}).select('gk').then((row)=>{
            gk_list = row[0].gk.split(",");
            return gk_list;
        }).then((gk_list)=> {
            return knex.select('*').from('yhgkhwttl').whereIn('gk', gk_list)
                .then((row) => {
                    let responseJson = {
                        rows: null,
                        success: false
                    };
                    if (!row) {
                        return {responseJson}
                    }
                    responseJson = {
                        rows: row,
                        success: true
                    };
                    return {responseJson};
                })
        })
    },
    get_mtnlsyd_metric({year}) {

        return knex.select('gk', 'metric').from('mtnlsyx').where({year: year}).orderBy('metric')
            .then((row) => {

                let responseJson = {
                    mtnlsyd_metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_metric: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_mtnlsyd_nh_metric({year}) {

        return knex.select('gk', 'metric').from('mtnlsyx_nh').where({year: year}).orderBy('metric')
            .then((row) => {

                let responseJson = {
                    mtnlsyd_metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_metric: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_bmaxttl_f_jzx_metric({year}) {

        return knex.select('gk', 'f_jzxbwbmaxttl').from('bmaxttl').where({year: year}).orderBy('f_jzxbwbmaxttl')
            .then((row) => {

                let responseJson = {
                    f_bmaxttl_jzx_metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    f_bmaxttl_jzx_metric: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_bmaxttl_jzx_metric({year}) {

        return knex.select('gk', 'jzxbwbmaxttl').from('bmaxttl').where({year: year}).orderBy('jzxbwbmaxttl')
            .then((row) => {

                let responseJson = {
                    bmaxttl_jzx_metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_jzx_metric: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_qwdttlswrs_year() {

        return knex.select('year').from('qwdttlswrs').groupBy('year')
            .then((row) => {

                let responseJson = {
                    qwdttlswrs_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    qwdttlswrs_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_qwdttlswrs_nh_year() {

        return knex.select('year').from('qwdttlswrs_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    qwdttlswrs_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    qwdttlswrs_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_qwdttlswrs({year}) {

        return knex.select('gk', 'metric').from('qwdttlswrs').where({year: year}).orderBy('metric')
            .then((row) => {

                let responseJson = {
                    metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    metric: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_qwdttlswrs_nh({year}) {

        return knex.select('gk', 'gkaqscsp').from('qwdttlswrs_nh').where({year: year}).orderBy('gkaqscsp')
            .then((row) => {

                let responseJson = {
                    metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    metric: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_yhgkmtkbnl_max_bw_year() {

        return knex.select('year').from('gkmtkbnl').groupBy('year')
            .then((row) => {

                let responseJson = {
                    yhgkmtkbnl_max_bw_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkmtkbnl_max_bw_year: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_gkmtkbnl_nh_max_bw_year() {

        return knex.select('year').from('gkmtkbnl_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    yhgkmtkbnl_max_bw_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkmtkbnl_max_bw_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_yhgkmtkbnl_max_bw({year}) {

        return knex.select('gk', 'max_bw').from('gkmtkbnl').where({year: year}).orderBy('max_bw')
            .then((row) => {

                let responseJson = {
                    yhgkmtkbnl_max_bw: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkmtkbnl_max_bw: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_gkmtkbnl_nh_max_bw({year}) {

        return knex.select('gk', 'mtzdkbnl').from('gkmtkbnl_nh').where({year: year}).orderBy('mtzdkbnl')
            .then((row) => {

                let responseJson = {
                    yhgkmtkbnl_max_bw: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkmtkbnl_max_bw: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_ddsr_year() {

        return knex.select('year').from('ddsr').groupBy('year')
            .then((row) => {

                let responseJson = {
                    ddsr_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr_year: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_ddsr_nh_year() {

        return knex.select('year').from('ddsr_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    ddsr_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_ddsr({year}) {

        return knex.select('gk', 'ddsr').from('ddsr').where({year: year}).orderBy('ddsr')
            .then((row) => {

                let responseJson = {
                    ddsr: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_ddsr_nh({year}) {

        return knex.select('gk', 'gkzjz').from('ddsr_nh').where({year: year}).orderBy('gkzjz')
            .then((row) => {

                let responseJson = {
                    ddsr: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_lsgkdj_year() {

        return knex.select('year').from('lsgkdj').groupBy('year')
            .then((row) => {

                let responseJson = {
                    lsgkdj_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj_year: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_lsgkdj_nh_year() {

        return knex.select('year').from('lsgkdj_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    lsgkdj_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_lsgkdj({year}) {

        return knex.select('gk', 'lsgkdj').from('lsgkdj').where({year: year}).orderBy('lsgkdj')
            .then((row) => {

                let responseJson = {
                    lsgkdj: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_lsgkdj_nh({year}) {

        return knex.select('gk', 'lsgkdj').from('lsgkdj_nh').where({year: year}).orderBy('lsgkdj')
            .then((row) => {

                let responseJson = {
                    lsgkdj: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_yhgkmtkbnl_syx({year}) {

        return knex.select('gk', 'total_metric').from('gkmtkbnl').where({year: year}).orderBy('total_metric')
            .then((row) => {

                let responseJson = {
                    yhgkmtkbnl_syx: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkmtkbnl_syx: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_gkmtkbnl_nh_syx({year}) {

        return knex.select('gk', 'metric').from('gkmtkbnl_nh').where({year: year}).orderBy('metric')
            .then((row) => {

                let responseJson = {
                    yhgkmtkbnl_syx: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkmtkbnl_syx: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_overall_metric_for_trend({gk}) {

        return knex.select('year', 'metric').from('overall_metric').where({gk: gk}).orderBy('year')
            .then((row) => {
                let responseJson = {
                    overall_metric_for_trend: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    overall_metric_for_trend: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_overall_metric_rank({year,gk}) {
        return knex.select('rank').from('overall_metric_for_order').where({year: year,gk:gk})
            .then((row) => {
                let responseJson = {
                    rank: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    rank: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_overall_metric_for_order({year}) {

        return knex.select('gk', 'metric').from('overall_metric').where({year: year}).orderBy('metric')
            .then((row) => {

                let responseJson = {
                    overall_metric_for_order: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    overall_metric_for_order: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_gkjxzdf_gk() {

        return knex.select('gk').from('overall_metric').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    gkjxzdf_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    gkjxzdf_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_gkjxzdf_year() {

        return knex.select('year').from('overall_metric').groupBy('year')
            .then((row) => {

                let responseJson = {
                    gkjxzdf_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    gkjxzdf_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_gkjxzdf({year, gk}) {

        var sqlStr = "SELECT * \
  FROM (SELECT year, gk,yhgkhwttl, yhgkjzxttl,dckbsl, gkmtkbnl ,bmaxttl,mtnlsyx,cbzgpjts, ddsr, lsgkdj, qwdttlswrs,least_column,greatest_column, \
    (((((((`overall_metric`.`yhgkhwttl` * 0.2) + (`overall_metric`.`yhgkjzxttl` * 0.5)) + (`overall_metric`.`dckbsl` * 0.2)) + (`overall_metric`.`gkmtkbnl` * 0.1)) * 0.4) + ((((`overall_metric`.`bmaxttl` * 0.5) + (`overall_metric`.`mtnlsyx` * 0.4)) + (`overall_metric`.`cbzgpjts` * 0.1)) * 0.3)) + ((((`overall_metric`.`ddsr` * 0.6) + (`overall_metric`.`lsgkdj` * 0.2)) + (`overall_metric`.`qwdttlswrs` * 0.2)) * 0.3)) AS `overall_metric`\
            FROM harbour.overall_metric \
            WHERE year=? and gk=?) AS tbA \
  LEFT JOIN (SELECT year, \
  max(yhgkhwttl) as  yhgkhwttl_max, max(yhgkjzxttl) as yhgkjzxttl_max, max(dckbsl) as dckbsl_max,\
  max(gkmtkbnl) as gkmtkbnl_max , max(bmaxttl) as bmaxttl_max, max(mtnlsyx) as mtnlsyx_max,\
  max(cbzgpjts) as cbzgpjts_max , max(ddsr) as ddsr_max, max(lsgkdj) as lsgkdj_max,\
  max(qwdttlswrs) as qwdttlswrs_max ,\
  avg(yhgkhwttl) as  yhgkhwttl_avg, avg(yhgkjzxttl) as yhgkjzxttl_avg, avg(dckbsl) as dckbsl_avg,\
  avg(gkmtkbnl) as gkmtkbnl_avg , avg(bmaxttl) as bmaxttl_avg, avg(mtnlsyx) as mtnlsyx_avg,\
  avg(cbzgpjts) as cbzgpjts_avg , avg(ddsr) as ddsr_avg, avg(lsgkdj) as lsgkdj_avg,\
  avg(qwdttlswrs) as qwdttlswrs_avg ,\
  min(yhgkhwttl) as  yhgkhwttl_min, min(yhgkjzxttl) as yhgkjzxttl_min, min(dckbsl) as dckbsl_min,\
  min(gkmtkbnl) as gkmtkbnl_min , min(bmaxttl) as bmaxttl_min, min(mtnlsyx) as mtnlsyx_min,\
  min(cbzgpjts) as cbzgpjts_min , min(ddsr) as ddsr_min, min(lsgkdj) as lsgkdj_min,\
  min(qwdttlswrs) as qwdttlswrs_min \
            FROM harbour.overall_metric \
            GROUP BY year) as tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [year, gk])
            .then((row) => {


                let responseJson = {
                    gkjxzdf: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    gkjxzdf: row[0][0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },
    get_yhgkjxpjldt({gk}) {

        return knex('gk').where({gk})
            .then(([yhgkjxpjldt]) => {
                let responseJson = {
                    yhgkjxpjldt: {
                        id: null,
                        gk: null,
                        hwttl: null,
                        jjxttl: null,
                        dckbbz: null,
                        mtzzkbnl: null,
                        jzxbwbmaxttl: null,
                        bmaxttl: null,
                        fgljsbz: null,
                        ddsr: null,
                        gkzjz: null
                    },
                    success: false
                };

                if (!user) return {responseJson}

                responseJson = {
                    yhgkjxpjldt: {
                        id: yhgkjxpjldt_id,
                        gk: gk,
                        hwttl: hwttl,
                        jjxttl: jjxttl,
                        dckbbz: dckbbz,
                        mtzzkbnl: mtzzkbnl,
                        jzxbwbmaxttl: jzxbwbmaxttl,
                        bmaxttl: bmaxttl,
                        fgljsbz: fgljsbz,
                        ddsr: ddsr,
                        gkzjz: gkzjz
                    },
                    success: false
                };

                return {responseJson};
            })
    },
    get_yhgkhwttl_year() {

        return knex.select('year').from('yhgkhwttl').groupBy('year')
            .then((row) => {

                let responseJson = {
                    yhgkhwttl_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkhwttl_year: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_gkhwttl_nh_year() {

        return knex.select('year').from('gkhwttl_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    yhgkhwttl_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkhwttl_year: row,
                    success: true
                };
                return {responseJson};
            })
    },



    get_yhgkhwttl_gk() {
        return knex.select('gk').from('yhgkhwttl').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    yhgkhwttl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkhwttl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },


    get_gkhwttl_nh_gk() {
        return knex.select('gk').from('gkhwttl_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    yhgkhwttl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkhwttl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },




    get_yhgkhwttl_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, gkhwttl FROM harbour.yhgkhwttl WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.yhgkhwttl.year AS year, MIN(harbour.yhgkhwttl.gkhwttl) AS min, ROUND(AVG(harbour.yhgkhwttl.gkhwttl), 2) AS avg, MAX(harbour.yhgkhwttl.gkhwttl) AS max \
  FROM harbour.yhgkhwttl GROUP BY harbour.yhgkhwttl.year ORDER BY harbour.yhgkhwttl.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    gkhwttl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    gkhwttl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },


    get_gkhwttl_nh_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, metric FROM harbour.gkhwttl_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.gkhwttl_nh.year AS year, MIN(harbour.gkhwttl_nh.metric) AS min, ROUND(AVG(harbour.gkhwttl_nh.metric), 2) AS avg, MAX(harbour.gkhwttl_nh.metric) AS max \
  FROM harbour.gkhwttl_nh GROUP BY harbour.gkhwttl_nh.year ORDER BY harbour.gkhwttl_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    gkhwttl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    gkhwttl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },




    get_yhgkhwttl({year}) {

        return knex.select('gk', 'gkhwttl').from('yhgkhwttl').where({year: year}).orderBy('gkhwttl')
            .then((row) => {

                let responseJson = {
                    yhgkhwttl: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkhwttl: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_gkhwttl_nh({year}) {

        return knex.select('gk', 'gkhwttl').from('gkhwttl_nh').where({year: year}).orderBy('gkhwttl')
            .then((row) => {

                let responseJson = {
                    yhgkhwttl: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    yhgkhwttl: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_mtnlsyd_year() {

        return knex.select('year').from('mtnlsyx').groupBy('year')
            .then((row) => {

                let responseJson = {
                    mtnlsyd_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_year: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_mtnlsyd_nh_year() {

        return knex.select('year').from('mtnlsyx_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    mtnlsyd_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_mtnlsyd({year}) {

        return knex.select('gk', 'mtnlsyd').from('mtnlsyx').where({year: year}).orderBy('mtnlsyd')
            .then((row) => {

                let responseJson = {
                    mtnlsyd: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_mtnlsyd_nh({year}) {

        return knex.select('gk', 'gktgnlsyd').from('mtnlsyx_nh').where({year: year}).orderBy('gktgnlsyd')
            .then((row) => {

                let responseJson = {
                    mtnlsyd: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_cbzgpjts_year() {

        return knex.select('year').from('cbzgpjts').groupBy('year')
            .then((row) => {

                let responseJson = {
                    cbzgpjts_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    cbzgpjts_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_cbzgpjts({year}) {

        return knex.select('gk', 'jqpjqdts').from('cbzgpjts').where({year: year}).orderBy('jqpjqdts')
            .then((row) => {

                let responseJson = {
                    jqpjqdts: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jqpjqdts: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_dckbsl_year() {

        return knex.select('year').from('dckbsl').groupBy('year')
            .then((row) => {

                let responseJson = {
                    dckbsl_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    dckbsl_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_dckbsl({year}) {

        return knex.select('gk', 'dckbsl').from('dckbsl').where({year: year}).orderBy('dckbsl')
            .then((row) => {

                let responseJson = {
                    dckbsl: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    dckbsl: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_jzxttl_year() {

        return knex.select('year').from('yhgkjzxttl').groupBy('year')
            .then((row) => {

                let responseJson = {
                    jzxttl_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl_year: row,
                    success: true
                };
                return {responseJson};
            })
    },


    get_jzxttl_nh_year() {

        return knex.select('year').from('gkjzxttl_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    jzxttl_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl_year: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_jzxttl_gk() {
        return knex.select('gk').from('yhgkjzxttl').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    jzxttl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },


    get_jzxttl_nh_gk() {
        return knex.select('gk').from('gkjzxttl_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    jzxttl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },



    get_jzxttl_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, jzxttl FROM harbour.yhgkjzxttl WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.yhgkjzxttl.year AS year, MIN(harbour.yhgkjzxttl.jzxttl) AS min, ROUND(AVG(harbour.yhgkjzxttl.jzxttl), 2) AS avg, MAX(harbour.yhgkjzxttl.jzxttl) AS max \
  FROM harbour.yhgkjzxttl GROUP BY harbour.yhgkjzxttl.year ORDER BY harbour.yhgkjzxttl.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    jzxttl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },


    get_jzxttl_nh_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, metric FROM harbour.gkjzxttl_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.gkjzxttl_nh.year AS year, MIN(harbour.gkjzxttl_nh.metric) AS min, ROUND(AVG(harbour.gkjzxttl_nh.metric), 2) AS avg, MAX(harbour.gkjzxttl_nh.metric) AS max \
  FROM harbour.gkjzxttl_nh GROUP BY harbour.gkjzxttl_nh.year ORDER BY harbour.gkjzxttl_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    jzxttl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },


    get_gkmtkbnl_nh_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, metric FROM harbour.gkmtkbnl_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.gkmtkbnl_nh.year AS year, MIN(harbour.gkmtkbnl_nh.metric) AS min, ROUND(AVG(harbour.gkmtkbnl_nh.metric), 2) AS avg, MAX(harbour.gkmtkbnl_nh.metric) AS max \
  FROM harbour.gkmtkbnl_nh GROUP BY harbour.gkmtkbnl_nh.year ORDER BY harbour.gkmtkbnl_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    gkmtkbnl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    gkmtkbnl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },


    get_jzxttl({year}) {

        return knex.select('gk', 'jzxttl').from('yhgkjzxttl').where({year: year}).orderBy('jzxttl')
            .then((row) => {

                let responseJson = {
                    jzxttl: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_jzxttl_nh({year}) {

        return knex.select('gk', 'jzxttl').from('gkjzxttl_nh').where({year: year}).orderBy('jzxttl')
            .then((row) => {

                let responseJson = {
                    jzxttl: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    jzxttl: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_bmaxttl_year() {

        return knex.select('year').from('bmaxttl').groupBy('year')
            .then((row) => {

                let responseJson = {
                    bmaxttl_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_bmaxttl_nh_year() {

        return knex.select('year').from('bmaxttl_nh').groupBy('year')
            .then((row) => {

                let responseJson = {
                    bmaxttl_year: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_year: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_bmaxttl_total_metric({year}) {

        return knex.select('gk', 'total_metric').from('bmaxttl').where({year: year}).orderBy('total_metric')
            .then((row) => {

                let responseJson = {
                    bmaxttl_total_metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_total_metric: row,
                    success: true
                };
                return {responseJson};
            })
    },
    get_bmaxttl_nh_total_metric({year}) {

        return knex.select('gk', 'metric').from('bmaxttl_nh').where({year: year}).orderBy('metric')
            .then((row) => {

                let responseJson = {
                    bmaxttl_total_metric: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_total_metric: row,
                    success: true
                };
                return {responseJson};
            })
    },
    update_radar() {
        return knex.raw('call overall_metric_generator()').then((test) => {

            let responseJson = {
                success: true
            };
            return {responseJson}
        }).catch(e => console.log(e));
    },






    get_dckbsl_gk() {
        return knex.select('gk').from('dckbsl').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    dckbsl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    dckbsl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_dckbsl_nh_gk() {
        return knex.select('gk').from('dckbsl_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    dckbsl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    dckbsl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },


    get_dckbsl_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, dckbsl FROM harbour.dckbsl WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.dckbsl.year AS year, MIN(harbour.dckbsl.dckbsl) AS min, ROUND(AVG(harbour.dckbsl.dckbsl), 2) AS avg, MAX(harbour.dckbsl.dckbsl) AS max \
  FROM harbour.dckbsl GROUP BY harbour.dckbsl.year ORDER BY harbour.dckbsl.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    dckbsl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    dckbsl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },






    get_bmaxttl_gk() {
        return knex.select('gk').from('bmaxttl').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    bmaxttl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },



    get_bmaxttl_nh_gk() {
        return knex.select('gk').from('bmaxttl_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    bmaxttl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },


    get_gkmtkbnl_nh_gk() {
        return knex.select('gk').from('gkmtkbnl_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    gkmtkbnl_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    gkmtkbnl_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },



    get_bmaxttl_jxsp({gk}) {

  //       var sqlStr= "SELECT * \
  // FROM (SELECT year, (harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)) AS bmaxttl FROM harbour.bmaxttl WHERE gk=?) AS tbA \
  // LEFT JOIN (SELECT harbour.bmaxttl.year AS year, ROUND(MIN(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)),2) AS min, \
  // ROUND(AVG(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)), 2) AS avg, \
  // MAX(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)) AS max \
  // FROM harbour.bmaxttl GROUP BY harbour.bmaxttl.year ORDER BY harbour.bmaxttl.year) AS tbC \
  // ON tbA.year = tbC.year";

        var sqlStr= "SELECT * \
  FROM (SELECT year, (harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)) AS bmaxttl FROM harbour.bmaxttl WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.bmaxttl.year AS year, ROUND(MIN(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)),2) AS min, \
  ROUND(AVG(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)), 2) AS avg, \
  MAX(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)) AS max \
  FROM harbour.bmaxttl GROUP BY harbour.bmaxttl.year ORDER BY harbour.bmaxttl.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    bmaxttl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },




    get_bmaxttl_nh_jxsp({gk}) {

        //       var sqlStr= "SELECT * \
        // FROM (SELECT year, (harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)) AS bmaxttl FROM harbour.bmaxttl WHERE gk=?) AS tbA \
        // LEFT JOIN (SELECT harbour.bmaxttl.year AS year, ROUND(MIN(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)),2) AS min, \
        // ROUND(AVG(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)), 2) AS avg, \
        // MAX(harbour.bmaxttl.hwttl/(harbour.bmaxttl.jzxbwcd + harbour.bmaxttl.f_jzxbwcd)) AS max \
        // FROM harbour.bmaxttl GROUP BY harbour.bmaxttl.year ORDER BY harbour.bmaxttl.year) AS tbC \
        // ON tbA.year = tbC.year";

        var sqlStr= "SELECT * \
  FROM (SELECT year, harbour.bmaxttl_nh.metric AS metric FROM harbour.bmaxttl_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.bmaxttl_nh.year AS year, ROUND(MIN(harbour.bmaxttl_nh.metric),2) AS min, \
  ROUND(AVG(harbour.bmaxttl_nh.metric), 2) AS avg, \
  MAX(harbour.bmaxttl_nh.metric) AS max \
  FROM harbour.bmaxttl_nh GROUP BY harbour.bmaxttl_nh.year ORDER BY harbour.bmaxttl_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    bmaxttl_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    bmaxttl_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },





    get_mtnlsyd_gk() {
        return knex.select('gk').from('mtnlsyx').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    mtnlsyd_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_mtnlsyd_nh_gk() {
        return knex.select('gk').from('mtnlsyx_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    mtnlsyd_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },



    get_mtnlsyd_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, mtnlsyd FROM harbour.mtnlsyx WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.mtnlsyx.year AS year, MIN(harbour.mtnlsyx.mtnlsyd) AS min, ROUND(AVG(harbour.mtnlsyx.mtnlsyd), 2) AS avg, MAX(harbour.mtnlsyx.mtnlsyd) AS max \
  FROM harbour.mtnlsyx GROUP BY harbour.mtnlsyx.year ORDER BY harbour.mtnlsyx.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    mtnlsyd_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },


    get_mtnlsyd_nh_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, metric FROM harbour.mtnlsyx_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.mtnlsyx_nh.year AS year, MIN(harbour.mtnlsyx_nh.metric) AS min, ROUND(AVG(harbour.mtnlsyx_nh.metric), 2) AS avg, MAX(harbour.mtnlsyx_nh.metric) AS max \
  FROM harbour.mtnlsyx_nh GROUP BY harbour.mtnlsyx_nh.year ORDER BY harbour.mtnlsyx_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    mtnlsyd_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    mtnlsyd_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },




    get_cbzgpjts_gk() {
        return knex.select('gk').from('cbzgpjts').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    cbzgpjts_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    cbzgpjts_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },




    get_cbzgpjts_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, jqpjqdts FROM harbour.cbzgpjts WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.cbzgpjts.year AS year, MIN(harbour.cbzgpjts.jqpjqdts) AS min, ROUND(AVG(harbour.cbzgpjts.jqpjqdts), 2) AS avg, MAX(harbour.cbzgpjts.jqpjqdts) AS max \
  FROM harbour.cbzgpjts GROUP BY harbour.cbzgpjts.year ORDER BY harbour.cbzgpjts.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    cbzgpjts_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    cbzgpjts_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },






    get_ddsr_gk() {
        return knex.select('gk').from('ddsr').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    ddsr_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_ddsr_nh_gk() {
        return knex.select('gk').from('ddsr_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    ddsr_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },




    get_ddsr_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, ddsr FROM harbour.ddsr WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.ddsr.year AS year, MIN(harbour.ddsr.ddsr) AS min, ROUND(AVG(harbour.ddsr.ddsr), 2) AS avg, MAX(harbour.ddsr.ddsr) AS max \
  FROM harbour.ddsr GROUP BY harbour.ddsr.year ORDER BY harbour.ddsr.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    ddsr_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },

    get_ddsr_nh_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, metric FROM harbour.ddsr_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.ddsr_nh.year AS year, MIN(harbour.ddsr_nh.metric) AS min, ROUND(AVG(harbour.ddsr_nh.metric), 2) AS avg, MAX(harbour.ddsr_nh.metric) AS max \
  FROM harbour.ddsr_nh GROUP BY harbour.ddsr_nh.year ORDER BY harbour.ddsr_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    ddsr_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    ddsr_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },







    get_lsgkdj_gk() {
        return knex.select('gk').from('lsgkdj').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    lsgkdj_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_lsgkdj_nh_gk() {
        return knex.select('gk').from('lsgkdj_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    lsgkdj_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },




    get_lsgkdj_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, lsgkdj FROM harbour.lsgkdj WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.lsgkdj.year AS year, MIN(harbour.lsgkdj.lsgkdj) AS min, ROUND(AVG(harbour.lsgkdj.lsgkdj), 2) AS avg, MAX(harbour.lsgkdj.lsgkdj) AS max \
  FROM harbour.lsgkdj GROUP BY harbour.lsgkdj.year ORDER BY harbour.lsgkdj.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    lsgkdj_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },

    get_lsgkdj_nh_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, lsgkdj FROM harbour.lsgkdj_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.lsgkdj_nh.year AS year, MIN(harbour.lsgkdj_nh.lsgkdj) AS min, ROUND(AVG(harbour.lsgkdj_nh.lsgkdj), 2) AS avg, MAX(harbour.lsgkdj_nh.lsgkdj) AS max \
  FROM harbour.lsgkdj_nh GROUP BY harbour.lsgkdj_nh.year ORDER BY harbour.lsgkdj_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    lsgkdj_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    lsgkdj_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },







    get_qwdttlswrs_gk() {
        return knex.select('gk').from('qwdttlswrs').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    qwdttlswrs_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    qwdttlswrs_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },

    get_qwdttlswrs_nh_gk() {
        return knex.select('gk').from('qwdttlswrs_nh').groupBy('gk')
            .then((row) => {

                let responseJson = {
                    qwdttlswrs_gk: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    qwdttlswrs_gk: row,
                    success: true
                };
                return {responseJson};
            })
    },


    get_qwdttlswrs_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, qwdttlswrs FROM harbour.qwdttlswrs WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.qwdttlswrs.year AS year, MIN(harbour.qwdttlswrs.qwdttlswrs) AS min, ROUND(AVG(harbour.qwdttlswrs.qwdttlswrs), 2) AS avg, MAX(harbour.qwdttlswrs.qwdttlswrs) AS max \
  FROM harbour.qwdttlswrs GROUP BY harbour.qwdttlswrs.year ORDER BY harbour.qwdttlswrs.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    qwdttlswrs_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    qwdttlswrs_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },


    get_qwdttlswrs_nh_jxsp({gk}) {

        var sqlStr= "SELECT * \
  FROM (SELECT year, gkaqscsp FROM harbour.qwdttlswrs_nh WHERE gk=?) AS tbA \
  LEFT JOIN (SELECT harbour.qwdttlswrs_nh.year AS year, MIN(harbour.qwdttlswrs_nh.gkaqscsp) AS min, ROUND(AVG(harbour.qwdttlswrs_nh.gkaqscsp), 2) AS avg, MAX(harbour.qwdttlswrs_nh.gkaqscsp) AS max \
  FROM harbour.qwdttlswrs_nh GROUP BY harbour.qwdttlswrs_nh.year ORDER BY harbour.qwdttlswrs_nh.year) AS tbC \
  ON tbA.year = tbC.year";

        return knex.raw(sqlStr, [gk])
            .then((row) => {


                let responseJson = {
                    qwdttlswrs_jxsp: null,
                    success: false
                };
                if (!row) {

                    return {responseJson}
                }
                responseJson = {
                    qwdttlswrs_jxsp: row[0],
                    success: true
                };


                return {responseJson};
            }).catch(e => console.log(e))
    },



}


function saltHashPassword({
                              password,
                              salt = randomString()
                          }) {
    const hash = crypto
        .createHmac('sha512', salt)
        .update(password)
    return {
        salt,
        hash: hash.digest('hex')
    }
}

function randomString() {
    return crypto.randomBytes(4).toString('hex')
}


function insert_into_table(storProcStr, paramList) {
    console.log("in function insert_into_table");
    return knex.raw(storProcStr, paramList)
        .then((ret) => {
            let row = ret[0][0][0];
                let responseJson = {
                    row: null,
                    success: false
                };
                if (!row) {
                    return {responseJson}
                }
                responseJson = {
                    row: row,
                    success: true
                };
                return {responseJson};
        }).catch(e => console.log(e))
}


function delete_from_table(tableName, ids) {
    return knex(tableName).whereIn('id', ids)
        .del()
        .then((delCount) => {
            return {delCount};
        })
}

function update_table(storProcStr, paramList) {
    return knex.raw(storProcStr, paramList)
        .then((ret) => {
            let rows = {};
            rows =  ret[0][0];

            let responseJson = {
                rows: null,
                success: false
            };
            if (!rows) {
                return {responseJson}
            }
            responseJson = {
                rows: rows,
                success: true
            };
            return {responseJson};
        })
}

function getRowIds(rows) {
    let res = []
    rows.forEach((row, index) => {
        res.push(row.id)
    })
    console.log(res)
    return res.join()
}