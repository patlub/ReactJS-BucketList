// styles
import '../App.css';

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

// stateful components
import AddBucket from './AddBucket';
import AddItem from '../items/AddItem';
import BucketList from './BucketList';
import ItemList from '../items/ItemList';

// Third party library
import _ from 'lodash';

// configs
import {baseURL} from '../configs/config';

// stateless components
import NavBar from '../components/NavBar';
import BucketTableHeader from '../components/BucketTableHeader';
import ItemtableHeader from '../components/ItemTableHeader';

// configs
import axios from 'axios'

let bucketLists = [];
let items = [];

class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buckets: [],
            items: [],
            bucketId: '',
            bucketClicked: false,
        };
    }

    componentWillMount() {
        this.getBuckets()
            .then((allbucketLists) => {
                bucketLists = allbucketLists;
                this.setState({buckets: bucketLists})
            })
            .catch(err => console.log(err))
    }

    render() {
        // Check if they are logged in
        if (!localStorage.getItem('token')) {
            return <Redirect to="/login"/>
        }
        // Show both buckets and items
        return (
            <div className="container-fluid">
                <NavBar/>
                {this.bucketSection()}
                {this.itemSection()}
            </div>
        );
    }

    /*
    * Render buckets section
    * */
    bucketSection = () => {
        // If there are no buckets
        if (this.state.buckets.length === 0) {
            return this.noBuckets();
        }

        // Display the buckets
        return (
            <div className="col-md-7 col-sm-12 col-xs-12 bucket-sec">
                <AddBucket addBucket={this.addBucket}/>
                <table className="table table-responsive table-striped bucket-table" width="20%">
                    <BucketTableHeader/>
                    <tbody>
                    {this.renderBuckets()}
                    </tbody>
                </table>
            </div>
        );
    };

    /*
    * Rendered if there are no buckets
    * */
    noBuckets = () => {
        return (
            <div className="container-fluid">
                <AddBucket addBucket={this.addBucket}/>
                <div className="col-sm-7">No bucket Lists</div>
            </div>
        );
    };

    itemSection = () => {
        // If there are no items
        if (this.state.bucketClicked && this.state.items.length === 0) {
            return (
                <AddItem
                    bucketId={this.state.bucketId}
                    addItem={this.addItem}/>
            );
        } else if (this.state.bucketClicked && this.state.items.length !== 0) {
            // Display the items
            return (
                <div className="col-md-5 col-sm-12 col-xs-12 item-sec">
                    <AddItem
                        bucketId={this.state.bucketId}
                        addItem={this.addItem}/>
                    <table className="table table-responsive table-striped">
                        <ItemtableHeader/>
                        <tbody>
                        {this.renderItems()}
                        </tbody>
                    </table>
                </div>
            );
        }

    };

    /*
    *
    * Fetches the buckets from API
    * */
    getBuckets = () => {
        return axios.get(`${baseURL}/buckets`, {headers: {'Authorization': localStorage.getItem('token')}})
            .then(response => {
                    return response.data
                }
            )
            .catch(err => console.log(err));
    };

    /*
    *
    * Adds a bucket and updates state
    * @param {bucket} bucket object to be added
    * */
    addBucket = (bucket) => {
        bucketLists.push(bucket);
        this.setState({buckets: bucketLists});
    };

    /*
    *
    * Updates a bucket
    * @param {id} id of bucket to update
    * @param {name} new name of bucket
    * @param {description} new description of bucket
    * */
    updateBuckets = (id, name, desc) => {
        let index = _.findIndex(bucketLists, function (o) {
            return o.id === id
        });
        bucketLists[index].name = name;
        bucketLists[index].desc = desc;
        this.setState({buckets: bucketLists});
    };

    /*
    *
    * Removes a bucket
    * @param {bucketId} id of bucket to delete
    * */
    deleteBucket = (bucketId) => {
        _.remove(bucketLists, function (o) {
            return o.id === bucketId
        });
        this.setState({
            buckets: bucketLists,
            bucketClicked: false,
            items
        })
    };

    /*
    * Assigns fetched items to the state
    * @param {fetchedItems} Items that have been fetched
    * @param {bucketId} id of the bucket of the items
    * */
    getItems = (fetchedItems, bucketId) => {
        this.setState({items: ''});
        items = fetchedItems.slice();
        this.setState({
            items,
            bucketId: bucketId,
            bucketClicked: true,
        })
    };

    /*
    * Adds an item
    * @param {item} item object to be added to items
    * */
    addItem = (item) => {
        items.push(item);
        this.setState({items})
    };

    /*
    * Updates an item
    * @param {item} updated item
    * @param {id} id of item to update
    * */
    updateItems = (item, id) => {
        let index = _.findIndex(items, function (o) {
            return o.id === id
        });
        items[index] = item;
        this.setState({items})
    };

    /*
    * Deletes an item
    * @param {itemId} id of item to be deleted
    * */
    deleteItem = (itemId) => {
        _.remove(items, function (o) {
            return o.id === itemId
        });
        this.setState({items})
    };

    /*
    *
    * Map buckets to a BucketLists
    * */
    renderBuckets = () => {
        return (
            this.state.buckets.map(bucket => (<BucketList key={bucket.id}{...bucket}
                                                          deleteBucket={this.deleteBucket.bind(this)}
                                                          updateBuckets={this.updateBuckets.bind(this)}
                                                          getItems={this.getItems.bind(this)}/>)));
    };

    /*
    *
    * Map items to ItemLists
    * */
    renderItems = () => {
        return (
            this.state.items.map(item => (<ItemList key={item.id}{...item}
                                                    updateItems={this.updateItems.bind(this)}
                                                    deleteItem={this.deleteItem.bind(this)}/>)));
    };
}

export default Buckets;
