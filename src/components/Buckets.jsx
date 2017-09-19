import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AddBucket from './AddBucket';
import AddItem from './AddItem';
import '../App.css';
import NavBar from './NavBar';
import axiosInstance from './config';
import _ from 'lodash';
import BucketList from './BucketList';
import ItemList from './ItemList';
import BucketTableHeader from './BucketTableHeader';
import ItemtableHeader from './ItemTableHeader';

const bucketLists = [];
let items = [];

class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            buckets: '',
            items: '',
            bucketId: '',
        };
    }

    // Fetch buckets before render
    componentWillMount() {
        if (!this.state.buckets) {
            this.getBuckets();
        }
    }

    render() {
        // Check if they are logged in
        if (!this.state.token) {
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

    bucketSection = () => {
        // If there are no buckets
        if (this.state.buckets.length === 0) {
            return (
                <div className="container-fluid">
                    <AddBucket addBucket={this.addBucket}/>
                    <div className="col-sm-7">No bucket Lists</div>
                </div>
            );
        }

        // Display the buckets
        return (
            <div className="col-md-7 col-sm-12 col-xs-12">
                <AddBucket addBucket={this.addBucket}/>
                <table className="table table-responsive table-striped">
                    <BucketTableHeader/>
                    <tbody>
                    {this.renderBuckets()}
                    </tbody>
                </table>
            </div>
        );
    };

    itemSection = () => {
        // If there are no items
        if (this.state.items.length === 0) {
            return (
                <div className="col-md-5 col-sm-12 col-xs-12">
                    <AddItem
                        bucket_id={this.state.bucketId}
                        addItem={this.addItem}/>
                    <div className="col-sm-7">No Items</div>
                </div>
            );
        }

        // Display the items
        return (
            <div className="col-md-5 col-sm-12 col-xs-12">
                <AddItem
                    bucket_id={this.state.bucketId}
                    addItem={this.addItem}/>
                <table className="table table-responsive table-striped">
                    <ItemtableHeader/>
                    <tbody>
                    {this.renderItems()}
                    </tbody>
                </table>
            </div>
        );
    };

    /*
    *
    * Fetches the buckets from API
    * */
    getBuckets = () => {
        axiosInstance.get('/buckets')
            .then(function (response) {
                if (response.status === 200) {
                    bucketLists.length = 0;
                    _.forEach(response.data, function (value) {
                        bucketLists.push(value);
                    });
                    this.setState({buckets: bucketLists});
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    /*
    *
    * Adds a bucket and updates state
    * @param {bucket} bucket object to be added
    * */
    addBucket = (bucket) => {
        bucketLists.push(bucket);
        this.setState({buckets: bucketLists})
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
        this.setState({buckets: bucketLists})
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
        return _.map(
            this.state.buckets,
            (bucket, index) => <BucketList key={index}{...bucket}
                                           deleteBucket={this.deleteBucket.bind(this)}
                                           updateBuckets={this.updateBuckets.bind(this)}
                                           getItems={this.getItems.bind(this)}/>
        )
    };

    /*
    *
    * Map items to ItemLists
    * */
    renderItems = () => {
        return _.map(
            this.state.items,
            (item, index) => <ItemList key={index}{...item}
                                       updateItems={this.updateItems.bind(this)}
                                       deleteItem={this.deleteItem.bind(this)}/>)
    };
}

export default Buckets;
