<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Order Confirm</span>
        </nav-bread>
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <div class="check-step">
                <ul>
                    <li class="cur"><span>Confirm</span> address</li>
                    <li class="cur"><span>View your</span> order</li>
                    <li class="cur"><span>Make</span> payment</li>
                    <li class="cur"><span>Order</span> confirmation</li>
                </ul>
            </div>
            <div class="order-create">
                <div class="order-create-pic"><img src="/static/ok-2.png"></div>
                <div class="order-create-main">
                    <h3>Congratulations! <br/>Your order is under processing!</h3>
                    <p>
                        <span>Order ID: {{orderId}}</span>
                        <span>order total: {{orderTotal | currency('$')}}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <router-link class="btn btn--m" to="/cart">Cart List</router-link>
                        </div>
                        <div class="btn-r-wrap">
                            <router-link class="btn btn--m" to="/">Goods List</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        return {}
    },
    computed: {
        orderId () {
            return this.$route.query.orderId
        },
        orderTotal () {
            return this.$route.query.orderTotal
        }
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread,
        Modal
    }
}
</script>
