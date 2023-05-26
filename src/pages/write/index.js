import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

class Write extends PureComponent {
  render() {
    // console.log(this.props);
    const { loginStatus } = this.props
    if(loginStatus){
      return (
         <div>写文章页面</div>  
      )
    } else {
      return <Navigate to='/login'/>
    }
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
})

export default connect(mapState, null)(Write)