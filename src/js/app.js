{
    let app = new Vue({
        el: '#app',
        data: {
            mainClass:'defalut',
            editingName: false,
            loginVisible: false,
            signUpVisible: false,
            shareLink:'',
            shareVisible:false,
            skinChooserVisible:false,
            logoutVisible:false,
            bodyClass:'defalut',
            mode:'edit',
            currentUser: {
                objectId: undefined,
                email:undefined,
            },
            previewResume:{
                name: '姓名',
                gender: '性别',
                birthday: '出生年月',
                jobTitle: '应聘职位',
                phone: '电话号码',
                email: 'example@example.com',
                skills:[
                    {name:'HTML、CSS',description:'有良好的HTML、CSS基础,能完美还原设计稿样式。'},
                    {name:'JavasScript',description:'熟练使用js编程，对闭包、原型链等都有所了解。'},
                    {name:'vue jquery等',description:'有jquery 、vue等前端框架开发经验，能熟练使用框架编写页面。'},
                    {name:'移动端页面',description:'会使用 REM、vw/vh、vconsole等技术制作调试移动端页面。'},
                ],
                projects:[
                    {name:'网易云移动端',link:'https://lolimy.club/163-music/src/',keywords:'移动端 JQuery rem',description:'仿网易云客移动端，实现大部分功能。还有一个https://lolimy.club/163-music/src/admin的在线上传页面',},
                    {name:'vue在线简历',link:'https://lolimy.club/vue-resume/src/',keywords:'vue 在线注册、保存',description:'一个用Vue编写的在线简历编辑器，可以注册登录账号保存内容。',}
                ],
            },
            resume: {
                name: '姓名',
                gender: '性别',
                birthday: '出生年月',
                jobTitle: '应聘职位',
                phone: '电话号码',
                email: 'example@example.com',
                skills:[
                    {name:'HTML、CSS',description:'有良好的HTML、CSS基础,能完美还原设计稿样式。'},
                    {name:'JavasScript',description:'熟练使用js编程，对闭包、原型链等都有所了解。'},
                    {name:'vue jquery等',description:'有jquery 、vue等前端框架开发经验，能熟练使用框架编写页面。'},
                    {name:'移动端页面',description:'会使用 REM、vw/vh、vconsole等技术制作调试移动端页面。'},
                ],
                projects:[
                    {name:'网易云移动端',link:'https://lolimy.club/163-music/src/',keywords:'移动端 JQuery rem',description:'仿网易云客移动端，实现大部分功能。还有一个https://lolimy.club/163-music/src/admin的在线上传页面',},
                    {name:'vue在线简历',link:'https://lolimy.club/vue-resume/src/',keywords:'vue 在线注册、保存',description:'一个用Vue编写的在线简历编辑器，可以注册登录账号保存内容。',}
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
        computed:{
            displayResume(){
                return this.mode === 'preview' ? this.previewResume:this.resume
            }
        },
        watch:{
            'currentUser.objectId':function(newValue,oldValue){
                if(newValue){
                    this.getResume(this.currentUser).then((resume)=>this.resume=resume)
                }
            }
        },
        methods: {
            onShare(){
                if(this.hasLogin()){
                    this.shareVisible = true
                    console.log('this.shareVisible')
                }else{
                    alert('请先点击保存登录')
                }
            },
            onEdit(key, value) {
                console.log(key)
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
                    this.loginVisible = false
                    this.signUpVisible = false
            },
            hasLogin(){
                return !!this.currentUser.objectId
            },
            onLogin(user) {
                this.loginVisible = false
                this.logoutVisible = true;
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.getResume(this.currentUser)
                console.log(location.origin + location.pathname + '?user_id=' + this.currentUser.objectId)
                this.shareLink = location.origin + location.pathname + '?user_id=' + this.currentUser.objectId
            },
            onLogout() {
                AV.User.logOut()
                this.currentUser = {
                    objectId: undefined,
                    email:undefined,
                }
                this.logoutVisible = false;
                alert('注销成功')//清除用户缓存
            },
            getResume(user){
                let query = new AV.Query('User');
                return query.get(user.objectId).then((user) => {
                    // 成功获得实例
                    let resume = user.toJSON().resume
                    return resume
                    //Object.assign(this.resume,resume)
                },(error) => {
                    // 异常处理
                });
            },
            addSkill(){
              this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
            },
            removeSkill(index){
                this.resume.skills.splice(index,1)
            },
            addProject(){
                this.resume.projects.push({name:'请填写技能名称',description:'请填写技能描述'})
            },
            removeProject(index){
                this.resume.projects.splice(index,1)
            },
            print(){
              window.print()
            },
            setTheme(name){
                document.body.className = name
            }
        }
    })
//获取当前用户
    let currentUser = AV.User.current()
    if(currentUser) {
        app.currentUser = currentUser.toJSON()
        app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
        app.getResume(app.currentUser).then(resume => {
            app.resume = resume
            app.logoutVisible = true
        })
    }
//获取预览用户
    let search = location.search
    let regex = /user_id=[^&]+/
    let matches = search.match(regex)
    let userId
    if(matches){
        userId = matches[1]
        app.mode = "preview"
        app.getResume({objectId:userId}).then(resume=>{
            app.previewResume = resume
        })

    }


}
