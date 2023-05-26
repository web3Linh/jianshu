import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import List from './components/List'
import Recommend from './components/Recommend'
import Topic from './components/Topic'
import Writer from './components/Writer'
import {actionCreators} from './store'

import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop,
} from './style'

class Home extends PureComponent {

  handleScrollTop() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
       <HomeWrapper>
        <HomeLeft>
         <img className='banner-img' src="https://upload.jianshu.io/admin_banners/web_images/5081/dd30d720d5edd35d28c7f6d8f79acf3e3edfbb1f.png?imageMogr2/quality/50" alt='1'/>
         <Topic />
         <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null}
       </HomeWrapper> 
      </div>
    )
  }

  componentDidMount(){
    // axios.get('/api/home.json').then((res) => {
    //     const result = res.data.data
    //     // console.log(result)
    //     const action = {
    //         type: 'change_home_data',
    //         articleList: result.articleList,
    //         recommendList: result.recommendList,
    //         topicList: result.topicList,
    //     }
    //     // 将action传递给 changeHomeData 方法
    //     this.props.changeHomeData(action)
    // })
    this.props.changeHomeData()
    // 绑定事件
    this.bindEvents()
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

  bindEvents(){
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }
}

const mapState = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
  })

const mapDispatch = (dispatch) => ({
    // changeHomeData 方法接收action
    changeHomeData(){
        // axios.get('/api/home.json').then((res) => {
        //     const result = res.data.data
        //     // console.log(result)
        //     const action = {
        //         type: 'change_home_data',
        //         articleList: result.articleList,
        //         recommendList: result.recommendList,
        //         topicList: result.topicList,
        //     }
        //     // // 将action传递给 changeHomeData 方法
        //     // this.props.changeHomeData(action)
        //     dispatch(action)
        // })
        // // 将action发给store
        // dispatch(action)
        const action = actionCreators.getHomeInfo()
        dispatch(action)
    },
    
    changeScrollTopShow(){
        if(document.documentElement.scrollTop > 100){
            dispatch(actionCreators.toggleTopShow(true))
        } else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})

export default connect(mapState, mapDispatch)(Home);
