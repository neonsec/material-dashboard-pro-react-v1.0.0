import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from './_actions';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

//import { RGCaptcha, reset } from 'react-geetest-captcha';

//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { alertActions } from '_actions';
//import { alert } from '_reducers/alert.reducer';

import  {history}  from '_helpers/history.js';

var divStyle = {
    //color: 'white',
    backgroundImage: 'url(' + '/background.jpg' + ')',
    WebkitTransition: 'all', // note the capital 'W' here
    msTransition: 'all', // 'ms' is the only lowercase vendor prefix
    height: '100%',
    backgroundSize:'cover'
};

var divAlertStyle = {
    color: 'red',
    WebkitTransition: 'all', // note the capital 'W' here
    msTransition: 'all', // 'ms' is the only lowercase vendor prefix
    fontSize: 10,
    alignment: 'left',
    height: 20,
};

var h1Style = {
    fontFamily: '微软雅黑',
    fontSize: 50,
};

var linkStyle = {
    fontSize: 15,
};

const styles = theme => ({
    card: {
        display: 'flex',
        width: 440,
        height: 290,
        padding: 20
    },
    backimg:{
        backgroundImage: '/background.jpg'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 220,
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100,
        height: 30,
        fontSize: 15
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 600,
        height: 290,
        marginRight: theme.spacing.unit,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                gk: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.username && user.password && user.gk) {
            dispatch(userActions.register(user));
        }
    }



    render() {
        const { registering, alert  } = this.props;
        const { user, submitted } = this.state;
        const { classes, theme } = this.props;


        return (
            <div align='center' style={divStyle}>
                <div>
                    <br/><br/><br/>
                    <h1 style={h1Style}>中国港口绩效数据库系统</h1>
                    <h3>China Port Performance Database System</h3>
                </div>
                <br/><br/>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image="/gk.jpg"
                    />
                    <CardContent className={classes.content}>
                    <h3>注册新用户</h3>

                    {/*<div className="col-md-6 col-md-offset-3">*/}

                        <form name="form" onSubmit={this.handleSubmit}>
                            {/*<TextField
                                id="org"
                                label="单位"
                                className={classes.textField}
                                value={this.state.org}
                                onChange={this.handleChange('org')}
                                margin="dense"
                            />*/}
                            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                <label htmlFor="username">账户</label>
                                <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                                {(submitted && !user.username) ? <div className="help-block">账户不能为空</div> : <div><br/></div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <label htmlFor="password">密码</label>
                                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                {submitted && !user.password ? <div className="help-block">密码不能为空</div> : <div><br/></div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.gk ? ' has-error' : '')}>
                                <label htmlFor="gk">港口</label>
                                <input type="text" className="form-control" name="gk" value={user.gk} onChange={this.handleChange} />
                                {submitted && !user.gk ? <div className="help-block">港口不能为空</div> : <div><br/></div>
                                }
                            </div>
                            <div className="form-group">
                                <AwesomeButton type="facebook" color="primary" className={classes.button}>注册</AwesomeButton>
                                {/*<button className="btn btn-primary">注册</button>*/}
                                {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <br/>
                                <Link to="/login" className="btn btn-link">取消</Link>
                            </div>
                        </form>
                        {
                            alert.message? <div>用户名已被注册</div>: null
                        }
                    </CardContent>
                    {/*</div>*/}
                </Card>
                <br/><br/><br/><br/><br/><br/>
                <div>
                    <h6 style={{fontSize: 20}}>技术支持：新华社中国经济信息社</h6>
                </div>
                <br/><br/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    const { alert } = state;
    return {
        registering, alert
    };
}

RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};




const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
//export { connectedLoginPage as LoginPage };

export default withStyles(styles, { withTheme: true })(connectedRegisterPage);

//export { LoginPage };