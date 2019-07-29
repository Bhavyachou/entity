import Vue from 'vue'
import Router from 'vue-router'
import EntityOnboard from '@/components/EntityOnboard'
import TrancheDetails from '@/components/TrancheDetails'
import KeyCommericalTerms from '@/components/KeyCommericalTerms'
import RevenueShare from '@/components/RevenueShare'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: {
                name: 'EntityOnboard',
                props: true,
            component: EntityOnboard
            }
        },
        {
            path: "/entityonboard",
            name: 'EntityOnboard',
            props: true,
            component: EntityOnboard
        },
        {
            path: "/tranchedetails",
            name: 'TrancheDetails',
            props: true,
            component: TrancheDetails
        },
        {
            path: "/keycommericalterms",
            name: 'KeyCommericalTerms',
            props: true,
            component: KeyCommericalTerms
        },
        {
            path: "/revenueshare",
            name: 'RevenueShare',
            props: true,
            component: RevenueShare
        },
    ]
})