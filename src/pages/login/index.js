import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { LoginWrapper, LoginBox, Input, Button } from './style'
import { actionCreators } from './store' 
class Login extends PureComponent {
  render() {
    // console.log(this.props);
    const { loginStatus } = this.props
    if(!loginStatus){
      return (
      <LoginWrapper>
        <LoginBox>
            <Input placeholder='账号' ref={(input) => { this.account = input}}/>
            <Input placeholder='密码' type='password' ref={(input) => { this.password = input }}/>
            {/* 调用login方法时，将 this.account，this.password传进去 */}
            <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
        </LoginBox>
      </LoginWrapper>      
      )
    } else {
      return <Navigate to='/'/>
    }
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
  // 接收
  login(accountElem, passwordElem){
    // console.log(accountElem.value, passwordElem.value)
    dispatch(actionCreators.login(accountElem.value, passwordElem.value))
  }
})

export default connect(mapState, mapDispatch)(Login)