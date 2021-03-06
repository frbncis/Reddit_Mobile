import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  ListView, 
  View, 
  Text, 
  StyleSheet, 
  RefreshControl 
} from 'react-native';
import { connect } from 'react-redux';

import ListItem from './ListItem';
import { fetchPosts } from '../actions';
import { Spinner } from './common';

const propTypes = {
  items: PropTypes.object,
  fetchPosts: PropTypes.func,
  isFetching: PropTypes.bool,
};

class ItemsList extends Component {  
  componentDidMount() {
    this.props.fetchPosts();
  }
  
  renderRow(item) {
    return <ListItem item={ item }/>;
  }

  render() {
    const { mainContainer, subContainer } = styles;
    const { 
      isFetching, 
      fetchPosts
    } = this.props;
    
    return (
      <View style={ mainContainer }>
        <View style={ subContainer }>
        {!isFetching && 
        <ListView
          dataSource={ this.props.items }
          renderRow={ this.renderRow }
          enableEmptySections={ true }
          refreshControl={
              <RefreshControl
                refreshing={ isFetching } //todo implement isRefreshing to keep state of list on scroll
                onRefresh={ () => fetchPosts() }
                title="Loading..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
              />
            }          
        />}
        </View>
        {isFetching && <View style={ subContainer }> 
          <Spinner/>
        </View>}
      </View>
    );
  }
}
const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = state => {
  const { 
    posts, 
    isFetching, 
  } = state.items;

  return { 
    items: dataSource.cloneWithRows(posts), 
    isFetching: isFetching,
  };
};

export default connect(mapStateToProps, { fetchPosts })(ItemsList);

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#f5f8fa' 
  },
  subContainer: {
    flex: 1
  }
});

ItemsList.propTypes = propTypes;