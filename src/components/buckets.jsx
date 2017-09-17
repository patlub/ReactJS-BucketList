import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AddBucket from './add_bucket';
import AddItem from './add_item';
import '../App.css';
import NavBar from './navbar';
import axiosInstance from './config';
import _ from 'lodash';
import BucketList from './BucketList';
import ItemList from './itemList';
import BucketTableHeader from './BucketTableHeader';
import ItemtableHeader from './ItemTableHeader';

const bucketLists = [];
let items = [];

class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            buckets: false,
            items: null,
            bucketId: null
        };
    }

    render() {
        if (this.state.token) {
            if (!this.state.buckets) {
                this.getBuckets();
            }

            if (bucketLists.length === 0) {
                return (
                    <div className="container-fluid">
                        <NavBar/>
                        <AddBucket buckets={this.state.buckets} addBucket={this.addBucket.bind(this)}/>
                        <div className="col-sm-7">No bucket Lists</div>
                    </div>
                );
            }
            if (this.state.items !== null) {
                // Buckets page has just loaded
                return (
                    <div className="container-fluid">
                        <NavBar/>
                        {this.bucketSection()}
                        {this.itemSection()}
                    </div>
                );
            } else {
                return (
                    <div className="container-fluid">
                        <NavBar/>
                        {this.bucketSection()}
                    </div>
                );
            }
        } else {
            return <Redirect to="/login"/>
        }
    }

    bucketSection() {
        return (
            <div className="col-md-7 col-sm-12 col-xs-12">
                <AddBucket buckets={this.state.buckets} addBucket={this.addBucket.bind(this)}/>
                <table className="table table-responsive table-striped">
                    <BucketTableHeader/>
                    <tbody>
                    {this.renderBuckets()}
                    </tbody>
                </table>
            </div>
        );
    }

    itemSection() {
        return (
            <div className="col-md-5 col-sm-12 col-xs-12">
                <AddItem items={this.state.items} bucket_id={this.state.bucketId} addItem={this.addItem.bind(this)}/>
                <table className="table table-responsive table-striped">
                    <ItemtableHeader/>
                    <tbody>
                    {this.renderItems()}
                    </tbody>
                </table>
            </div>
        );
    }

    getBuckets() {
        axiosInstance.get('/buckets')
            .then(function (response) {
                if (response.status === 200) {
                    _.forEach(response.data, function (value) {
                        bucketLists.push(value);
                    });
                    this.setState({buckets: bucketLists});
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    addBucket(bucket) {
        bucketLists.push(bucket);
        this.setState({buckets: bucketLists})
    }

    updateBuckets(id, name, desc) {
        let index = _.findIndex(bucketLists, function (o) {
            return o.id === id
        });
        bucketLists[index].name = name;
        bucketLists[index].desc = desc;
        this.setState({buckets: bucketLists});
    }

    deleteBucket(bucketId) {
        _.remove(bucketLists, function (o) {
            return o.id === bucketId
        });
        this.setState({buckets: bucketLists})
    }

    getItems(fetchedItems, bucketId) {
        items = fetchedItems.slice();
        this.setState({
            items,
            bucketId: bucketId
        })
    }

    addItem(item) {
        items.push(item);
        this.setState({items})
    }

    updateItems(item, id) {
        let index = _.findIndex(items, function (o) {
            return o.id === id
        });
        items[index] = item;
        this.setState({items})
    }

    deleteItem(itemId) {
        _.remove(items, function (o) {
            return o.id === itemId
        });
        this.setState({items})
    }

    renderBuckets() {
        return _.map(this.state.buckets, (bucket, index) => <BucketList key={index}{...bucket}
                                                                        deleteBucket={this.deleteBucket.bind(this)}
                                                                        updateBuckets={this.updateBuckets.bind(this)}
                                                                        getItems={this.getItems.bind(this)}/>)
    }

    renderItems() {
        return _.map(this.state.items, (item, index) => <ItemList key={index}{...item}
                                                                  updateItems={this.updateItems.bind(this)}
                                                                  deleteItem={this.deleteItem.bind(this)}/>)
    }

}


export default Buckets;
