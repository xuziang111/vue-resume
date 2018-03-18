{
    let app = new Vue({
        el: '#app',
        data: {
            editingName: false,
            loginVisible: false,
            signUpVisible: false,
            currentUser: {
                objectId: undefined,
                email:undefined,
            },
            resume: {
                name: 'xxx',
                gender: '男',
                birthday: '',
                jobTitle: '前端工程师',
                phone: '1111111111111',
                email: 'example@example.com',
                skills:[
                    {name:'请填写技能名称',description:'请填写技能描述'},
                    {name:'请填写技能名称',description:'请填写技能描述'},
                    {name:'请填写技能名称',description:'请填写技能描述'},
                    {name:'请填写技能名称',description:'请填写技能描述'},
                ],
            },
            signUp: {
                email: '',
                password: '',
            },
            login: {
                email: '',
                password: '',
            },
        },
        methods: {
            onEdit(key, value) {
                let regex = /\[(\d+)\]/g
                key = key.replace(regex,(match,number)=> `.${number}`)
                keys = key.split('.');
                let result = this.resume
                for(let i=0;i<keys.length;i++){
                    if(i === keys.length-1){
                        result[keys[i]] = value
                    }else{
                        result = result[keys[i]]
                    }
                }
                console.log(keys)
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
            showLogin() {

            },
            saveResume() {
                let {objectId} = AV.User.current().toJSON()
                var user = AV.Object.createWithoutData('User', objectId);
                // 修改属性
                user.set('resume', this.resume);
                // 保存到云端
                user.save().then(()=>{
                    alert('保存成功')
                },()=>{
                    alert('保存失败')
                });
            },
            onSignUp() {
                console.log(this.signUp)
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
                        this.loginVisible = false
                        this.currentUser = {
                            objectId: user.objectId,
                            email: user.email,//
                        }
                    })


                },  (error) => {
                    alert(error.rawMessage)
                });

            },
            hasLogin(){
                return !!this.currentUser.objectId
            },
            onLogin(e) {
                AV.User.logIn(this.login.email, this.login.password).then( (user) => {
                    console.log(user);
                    user = user.toJSON()
                    this.loginVisible = false
                    this.currentUser = {
                        objectId: user.objectId,
                        email: user.email,//
                    }
                },  (error) => {
                    if (error.code === 211) {
                        alert('邮箱不存在')
                    } else if (error.code === 210) {
                        alert('邮箱密码不匹配')
                    }
                });
            },
            onLogout(w) {
                AV.User.logOut()
                this.currentUser = {
                    objectId: undefined,
                    email:undefined,
                }
                alert('注销成功')//清除用户缓存
            },
            getResume(){
                let query = new AV.Query('User');
                query.get(this.currentUser.objectId).then((user) => {
                    // 成功获得实例
                    console.log(user)
                    let resume = user.toJSON().resume
                    Object.assign(this.resume,resume)
                },(error) => {
                    // 异常处理
                });
            },
            addSkill(){
              this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
            },
            removeSkill(index){
                this.resume.skills.splice(index,1)
            }
        }
    })
let currentUser = AV.User.current()
    console.log(currentUser)
    if(currentUser){
        app.currentUser = currentUser.toJSON()
        app.getResume()
    }
}