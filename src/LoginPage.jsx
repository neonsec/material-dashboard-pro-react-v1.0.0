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
import {cookies} from 'variables/general';
import {alert} from "./_reducers/alert.reducer";

var divStyle = {
    color: 'white',
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
    container:{
      height: 230,
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
        width: 220,
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
      height: 270,
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

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            org: '',
            username: '',
            password: '',
            submitted: false,
            isGuest: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

   
      handleChange = username => event => {
        this.setState({
          [username]: event.target.value,
        });
      };
      handleChange = org => event => {
        this.setState({
          [org]: event.target.value,
        });
      };
      handleChange = password => event => {
        this.setState({
          [password]: event.target.value,
        });
      };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("handleSubmit");
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            cookies.set('username',username,{path:'/'});
            dispatch(userActions.login(username, password));

        }
    }
    loginAsGuest(){
        const { dispatch } = this.props;
        console.log("loginAsGuest");
        cookies.set('username','guest',{path:'/'});
        dispatch(userActions.login("guest", "guest"));
    }

     render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        const { classes, theme } = this.props;
        const { alert } = this.props;


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
                    <br/>
                    <div>
                    <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <TextField
                            id="org"
                            label="单位"
                            className={classes.textField}
                            value={this.state.org}
                            onChange={this.handleChange('org')}
                            margin="dense"
                        />
                        <TextField
                            id="username"
                            label="账号"
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="dense"
                        />
                        <TextField
                            id="password"
                            label="密码"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            margin="dense"
                            type="password"
                        />
                        {/* {submitted && !password && !username &&
                            <div >用户名或密码不能为空</div>
                        } */}
                        {
                            alert.message? <div style={divAlertStyle}>提示：用户名或密码错误</div>:<div style={divAlertStyle}></div>
                        }
                       
                
                       <AwesomeButton type="facebook" color="primary" className={classes.button}>立即登录</AwesomeButton>

                    </form>
                    <AwesomeButton type="facebook" color="primary" className={classes.button} action={()=>this.loginAsGuest()}>游客登录</AwesomeButton>
                    <br/>
                    <Link to="/register" style={linkStyle}> 还没有账号？请点击注册</Link>

                    {loggingIn &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    </div>
                    {/* <Link to="/register" className={classes.link}>注册</Link> */}
                 </Card> 
                 <br/><br/><br/><br/>
                 <div>
                    <h6 style={{fontSize: 20}}>技术支持：新华社中国经济信息社</h6>
                </div>
                <br/><br/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,alert
    };
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  



const connectedLoginPage = connect(mapStateToProps)(LoginPage);
//export { connectedLoginPage as LoginPage }; 

export default withStyles(styles, { withTheme: true })(connectedLoginPage);

//export { LoginPage }; 