import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
            bucket_id: null
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
                        <NavBar />
                        <AddBucket buckets={this.state.buckets} addBucket={this.addBucket.bind(this)} />
                        <div className="col-sm-7">No bucket Lists</div>
                    </div>
                );
            }
            if (this.state.items !== null) {
                // Buckets page has just loaded
                return (
                    <div className="container-fluid">
                        <NavBar />
                        {this.bucketSection()}
                        {this.itemSection()}
                    </div>
                );
            } else {
                return (
                    <div className="container-fluid">
                        <NavBar />
                        {this.bucketSection()}
                    </div>
                );
            }
        } else {
            return <Redirect to="/login" />
        }
    }

    bucketSection() {
        return (
            <div className="col-sm-7">
                <AddBucket buckets={this.state.buckets} addBucket={this.addBucket.bind(this)} />
                <table className="table table-responsive table-striped">
                    <BucketTableHeader />
                    <tbody>
                        {this.renderBuckets()}
                    </tbody>
                </table>
            </div>
        );
    }

    itemSection() {
        return (
            <div className="col-sm-5">
                <AddItem items={this.state.items} bucket_id={this.state.bucket_id} addItem={this.addItem.bind(this)} />
                <table className="table table-responsive table-striped">
                    <ItemtableHeader />
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
                    this.setState({ buckets: bucketLists });
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    addBucket(bucket) {
        if (bucketLists.length !== 0) {
            bucketLists.push(bucket);
        }
        this.setState({ bucket: bucketLists })
    }

    addItem(item) {
        if (items.length !== 0) {
            items.push(item);
        }
        this.setState({ items: items })
    }

    getItems(fetched_items, bucket_id) {
        items = fetched_items.slice();
        this.setState({
            items: items,
            bucket_id: bucket_id
        })
    }

    updateItems(item, id){
        var index = _.findIndex(items, function(o){
            return o.id == id
        })
        console.log(items[index]);
        items[index] = item;
        console.log(items[index]);
        this.setState({items:items})
    }

    renderBuckets() {
        return _.map(this.state.buckets, (bucket, index) => <BucketList key={index}{...bucket}
            getBuckets={this.getBuckets.bind(this)}
            unSetBuckets={this.unSetBuckets.bind(this)}
            getItems={this.getItems.bind(this)} />)
    }

    renderItems() {
        return _.map(this.state.items, (item, index) => <ItemList key={index}{...item}
            updateItems={this.updateItems.bind(this)} />)
    }

    unSetBuckets() {
        bucketLists.length = 0;
        this.setState({ buckets: bucketLists });
    }
}


export default Buckets;
