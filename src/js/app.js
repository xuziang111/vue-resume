let app= new Vue({
    el:'#app',
    data: {
        loginVisible:false,
        editingName: false,
        signUpVisible:false,
        resume: {
            name: 'xxx',
            gender: '男',
            birthday: '',
            jobTitle: '前端工程师',
            phone: '1111111111111',
            email: 'example@example.com',
        },
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

        },
    }
})