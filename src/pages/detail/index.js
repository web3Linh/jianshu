import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { 
  DetailWrapper,
  Header,
  Content
 } from './style'

class Detail extends PureComponent {
  render() {
    // console.log(this.props);
    return (
      <>
        <DetailWrapper>
          <Header>{this.props.title}</Header>
          <Content dangerouslySetInnerHTML={{__html: this.props.content}}/>
        </DetailWrapper>
      </>
    )
  }
  // 发ajax请求
  componentDidMount (){
    this.props.getDetail();
  }
}

const mapState = (state) => ({
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content'])
})

const mapDispatch = (dispatch) => ({
  getDetail(){
    dispatch(actionCreators.getDetail())
  }
})

export default connect(mapState, mapDispatch)(Detail)