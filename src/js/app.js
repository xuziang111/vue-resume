let app= new Vue({
    el:'#app',
    data: {
        loginVisible:false,
        editingName: false,
        signUpVisible:true,
        resume: {
            name: 'xxx',
            gender: '男',
            birthday: '',
            jobTitle: '前端工程师',
            phone: '1111111111111',
            email: 'example@example.com',
        },
        signUp:{
            email:'',
            password:'',
        },
        login:{
            email:'',
            password:'',
        }
    },
    methods:{
        onEdit(key,value){
            this.resume[key] = value;
        },
        onClickSave() {
            let currentUser = AV.User.current();
            console.log(currentUser)
            if (!currentUser) {
                this.showLogin()
                this.loginVisible = true
            } else {
                console.log()
                this.saveResume()
            }

            // var User = AV.Object.extend('User');
            // // 新建对象
            // var user = new User();
            // // 设置名称
            // user.set('resume',this.resume);
            // // 设置优先级
            // user.set('priority',1);
            // user.save().then(function (user) {
            //     console.log('objectId is ' + user.id);
            // }, function (error) {
            //     console.error(error);
            // });
        },
        showLogin(){

        },
        saveResume(){
            let {id} = AV.User.current()
            var todo = AV.Object.createWithoutData('User', id);
            // 修改属性
            todo.set('resume', this.resume);
            // 保存到云端
            todo.save();
        },
        onSignUp(){
            console.log(this.signUp)
            const user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then(function (user) {
                console.log(user);
            }, function (error) {
            });

        },
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password).then(function (loginedUser) {
                console.log(loginedUser);
            }, function (error) {
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210){
                    alert('邮箱密码不匹配')
                }
            });
        },
        onLogout(w){
            AV.User.logOut()
            alert('注销成功')//清除用户缓存
        }
    }
})