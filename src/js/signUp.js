Vue.component('sign-up',{
    data(){
        return {
            signUp: {
                email: '',
                password: '',
            },
        }
    },
    methods:{
        onSignUp() {
            const user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then( (user) => {
                console.log(user)
                alert('注册成功')
                loginVisible = false
                signUpVisible = false
                AV.User.logIn(this.signUp.email, this.signUp.password).then( (user) => {
                    console.log(user);
                    user = user.toJSON()
                    this.$emit('signUp')
                    // this.loginVisible = false
                    // this.currentUser = {
                    //     objectId: user.objectId,
                    //     email: user.email,//
                    // }
                })


            },  (error) => {
                alert(error.rawMessage)
            });

        },
        onClickLogin(e){
            this.$emit('goToLogin')
        },
    },
    template:`
   <div class="signUp" v-cloak>
        <form class="form" @submit.prevent="onSignUp">
            <h2>注册</h2>
            <button @click="signUpVisible = false" type="button">关闭</button>
            <div class="row">
                <label>邮箱</label>
                <input v-model="signUp.email" type="text" name="user">
            </div>
            <div class="row">
                <label>密码</label>
                <input v-model="signUp.password" type="password" name="password">
            </div>
            <div class="action">
                <button type="submit">提交</button>
                <a href="#" @click="onClickLogin">登录</a>
            <!--signUpVisible = false;loginVisible = true-->
            </div>
        </form>
    </div>
    `,
})