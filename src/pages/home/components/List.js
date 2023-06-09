import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionCreators } from '../store'
import { 
    ListItem,
    ListInfo,
    LoadMore,
} from '../style'

class List extends PureComponent {
  render() {
    const { list, getMoreList, page } = this.props
    return (
        <>
        {
            list.map((item, index ) => {
                return (
                    <Link key={index} to='/detail'>
                        <ListItem>
                            <img className='pic' src={item.get('imgUrl')} alt='3'/>
                            <ListInfo>
                                <h3 className='title'>{item.get('title')}</h3>
                                <p className='desc'>{item.get('desc')}</p>
                            </ListInfo>
                        </ListItem>
                    </Link>
                )
            })
        }
        <LoadMore onClick={() => getMoreList(page) }>更多文字</LoadMore>
      </>
      
    )
  }
}

const mapState = (state) => ({
    list: state.getIn(['home', 'articleList']),
    page: state.getIn(['home', 'articlePage'])
})

const mapDispatch = (dispatch) => ({
    getMoreList(page){
        dispatch(actionCreators.getMoreList(page))
    }
})

export default connect(mapState, mapDispatch)(List)