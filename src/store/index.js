const store = {
    state: {
        nickName: '',
        cartCount: 0
    },
    mutations: {
        setName (state, userName) {
            state.nickName = userName
        },
        setCartCount (state, cartCount) {
            state.cartCount = cartCount
        }
    }
}

export default store