Vue.component('login',{
    data(){
        return {
            login: {
                email: '',
                password: '',
            }
        }
    },
    prop:[],
    methods:{
        onLogin(e) {
            AV.User.logIn(this.login.email, this.login.password).then( (user) => {
                user = user.toJSON()
                this.$emit('login',user)
                // this.loginVisible = false
                // this.currentUser = {
                //     objectId: user.objectId,
                //     email: user.email,//
                // }
            },  (error) => {
                if (error.code === 211) {
                    alert('邮箱不存在')
                } else if (error.code === 210) {
                    alert('邮箱密码不匹配')
                }
            });
        },
        onClickSignUp(){
            this.$emit('goToSignUp')
        },
    },
    template:`
    <div class="login" v-cloak>
        <form class="form" @submit.prevent="onLogin">
            <h2>登录</h2>
            <button @click="$emit('close')" type="button">关闭</button>
            <div class="row">
                <label>邮箱</label>
                <input v-model="login.email" type="text" name="user">
            </div>
            <div class="row">
                <label>密码</label>
                <input v-model="login.password" type="password" name="password">
            </div>
            <div class="action">
                <button>提交</button>
                <a href="#" @click="onClickSignUp">注册</a>
                <!--signUpVisible = true;loginVisible = false-->
            </div>
        </form>
    </div>
    `,

})