<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0);" class="default cur">Default</a>
                    <a href="javascript:void(0);" class="price" :class="{'sort-up':sortFlag}" @click="sortGoods()">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                    <a href="javascript:void(0);"></a>
                </div>
                <div class="accessory-result">
                    <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a href="javascrip:void(0);" @click="setPriceFilter('all')" :class="{'cur':priceChecked==='all'}">All</a></dd>
                            <dd v-for="(item,index) in priceFilter" :key="index">
                                <a href="javascrip:void(0);" @click="setPriceFilter(index)" :class="{'cur':priceChecked===index}">{{item.startPrice}} - {{item.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in goodsList" :key="item.productId">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice | currency('$')}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:void(0);" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                 <div class="view-more-normal"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="busy"
                    infinite-scroll-distance="20">
                    <span v-show="!loading">
                        <span v-if="!toEnd">loading more</span>
                        <span v-else>已经到底了</span>
                    </span>
                    <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                </div>
            </div>
        </div>
        <modal v-show="mdShow" @close="closeModal">
            <p slot="message">
                请先登陆，否则无法加入到购物车！
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:void(0);" @click="mdShow =false">关闭</a>
            </div>
        </modal>
        <modal v-show="mdShowCart" @close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                加入购物车成功！
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:void(0);" @click="mdShowCart =false">继续购物</a>
                <router-link class="btn btn--m btn--red" to="/cart">查看购物车</router-link>
            </div>
        </modal>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import axios from 'axios'

import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import Modal from '@/components/Modal'

export default {
    data () {
        return {
            goodsList: [],
            sortFlag: true,
            loading: false,
            busy: false,
            filterBy: false,
            toEnd:false,
            priceChecked: 'all',
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '100.00'
                },
                {
                    startPrice: '100.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '5000.00'
                }
            ],
            mdShow: false,
            mdShowCart: false,
            pageIndex: 1,
            pageSize: 8
        }
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread,
        Modal
    },
    mounted () {
        this.getGoodsList()
    },
    methods: {
        getGoodsList (flag) {
            const param = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                sort: this.sortFlag ? 1 : -1,
                priceLevel: this.priceChecked
            }
            this.loading = true
            axios.get('/goods/list', {params: param}).then(res => {
                this.loading = false
                if (res.data.status === '0') {
                    if (flag) {
                        this.goodsList = this.goodsList.concat(res.data.result.list)
                        if (res.data.result.count === 0) {
                            this.busy = true
                            this.toEnd = true
                        } else {
                            this.busy = false
                            this.toEnd = false
                        }
                    } else {
                        this.goodsList = res.data.result.list
                    }
                }
            })
        },
        sortGoods () {
            this.sortFlag = !this.sortFlag
            this.pageIndex = 1
            this.busy = false
            this.getGoodsList()
        },
        loadMore () {
            this.busy = true
            setTimeout(() => {
                this.pageIndex ++
                this.getGoodsList(true)
            }, 500)
        },
        setPriceFilter (type) {
            this.priceChecked = type
            this.pageIndex = 1
            this.busy = false
            this.getGoodsList()
        },
        addCart (productId) {
            if (this.$store.state.nickName) {
                axios.post('/goods/addCart',{productId: productId}).then(res => {
                    if (res.data.status === '0') {
                        this.getCartCount()
                    }
                })
            } else {
                this.mdShow = true
            }
        },
        getCartCount () {
            axios.get('/users/cartCount').then(res => {
                this.$store.commit('setCartCount', res.data.result)
                this.mdShowCart = true
            })
        },
        closeModal () {
            this.mdShow = false
            this.mdShowCart = false
        }
    }
}
</script>
