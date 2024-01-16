let app=Vue.createApp({
    data() {
        return {
            menu: [
                {
                    id: 0,
                    name: '小花束ＡＢ',
                    price: 350,
                    image: "0"
                },
                {
                    id: 1,
                    name: '小花束Ａ',
                    price: 199,
                    image: "1"
                },
                {
                    id: 2,
                    name: '小花束Ｂ',
                    price: 199,
                    image: "2"
                },
                {
                    id: 3,
                    name: '玻璃罩Ａ',
                    price: 1000,
                    image: 3
                },
                {
                    id: 4,
                    name: '玻璃罩B',
                    price: 1000,
                    image: 5
                },
                {
                    id: 5,
                    name: '玻璃罩C',
                    price: 1000,
                    image: 10
                },

                {
                    id: 7,
                    name: '花束Ａ',
                    price: 1000,
                    image: 13
                },
                {
                    id: 8,
                    name: '花束Ｂ',
                    price: 1000,
                    image: 14
                },
            ],
            cart: [],
            totalPrice:0,

        }
    },
    methods: {
        // 加入購物車
        addProductP(id) {
            const product = this.menu.find((product) => product.id == id)
            // console.log(product)
            const index = this.cart.findIndex((product) => product.id == id)
            if (index != -1) {
                this.cart[index].quantity++
            } else {
                this.cart.push({ ...product, quantity: 1 })
            }
            this.getTotalPrice()
        },
        // 計算總金額
        getTotalPrice() {
            console.log('getTotalPrice')
            var total = 0
            this.cart.forEach((item) => {
                total += item.price * item.quantity
            })
            this.totalPrice=total
            console.log(this.totalPrice)
            // return total
        },
        //減少數量
        reduceItemP(id) {
            var item = this.cart.find((item) => item.id == id)
            if (item.quantity > 1) {
                item.quantity--
            } else {
                this.cart = this.cart.filter((item) => item.id != id)
            }
            this.getTotalPrice()
        },
        // 增加數量
        addItemP(id){
            // console.log('addItemP')
            var item=this.cart.find((item)=>item.id==id)
            item.quantity++
            this.getTotalPrice()
        },
        // 移除商品
        removeItemP(id){
            this.cart=this.cart.filter((item)=>item.id!=id)
            this.getTotalPrice()
        }
    }
})

app.component('item-in-menu',{
    template:`
    <div class="row row-cols-4 mt-4">
        <div class="col justify-content-center text-center" 
            v-for="(item,index) in menu" 
            :key="index"
        >
            <div class="d-flex flex-column item">
                <img 
                    class="w-100 h-100" 
                    :src="'./images/mothers/LINE_ALBUM_240115_' + item.image + '.jpg'" 
                    alt="item.name"
                >

                <div class="p-3">
                    <h5 class="item-name">{{item.name}}</h5>
                    <h6 class="item-price">$ {{item.price}}</h6>
                    <button type="button" class="add-cart" @click="addProduct(item.id)">加入購物車</button>
                </div>
            </div>
        </div>
    </div>
    `,
    props:['menu',],
    data(){
        return {
        }
    },
    methods:{
        addProduct(id) {
            this.$emit("addProductC",id)
        }
    }
})

app.component('item-in-cart',{
    template:`
    <div class="cart">
        <div class="order-items" v-if="cart.length>0">
            <div class="order-item mb-4 " v-for="(item,index) in cart" :key="index" >

                <div class="order-item-content ">
                    <h5>
                        {{item.name}} - $ {{item.price}}
                        <button type="button" class="remove-icon" @click="removeItem(item.id)">X</button>
                    </h5>

                    <p>
                        <button type="button" class="add" @click="addItem(item.id)">+</button>
                        {{item.quantity}}
                        <button type=button class="remove" @click="reduceItem(item.id)">-</button>
                    </p>
                </div>
                
            </div>

        </div>

        <div class="cart-empty" v-else>
            <p class="text-center">
                購物車是空的
            </p>
        </div>

        <div class="total-section">
            <h6 class="total-title">
                總計：
            </h6>
            <span class="amount">
                $ {{total}}
            </span>
        </div>

    </div>    
    `,
    props:['cart','total'],
    methods:{
        reduceItem(id){
            this.$emit("reduceItemC",id)
        },
        addItem(id){
            this.$emit("addItemC",id)
        },
        removeItem(id){
            this.$emit("removeItemC",id)
        }
    }

})

app.mount("#unas")