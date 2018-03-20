Vue.component('resume',{
    props:['mode','displayResume','resume'],
    data(){

    },
    methods:{
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
    },
    template:`
    <div class="resume">
            <section>
                <h1>
                    <editable-span :disable="mode !== 'preview'" :value="displayResume.name" @edit="onEdit('name', $event)"></editable-span>
                </h1>
                <p>应聘职位：
                    <editable-span :disable="mode !== 'preview'" :value="displayResume.jobTitle" @edit="onEdit('jobTitle', $event)"></editable-span>
                </p>
                <p class="profile">
                    <editable-span :disable="mode !== 'preview'" :value="displayResume.birthday" @edit="onEdit('birthday', $event)"></editable-span>
                    |
                    <editable-span :disable="mode !== 'preview'" :value="displayResume.gender" @edit="onEdit('gender', $event)"></editable-span>
                    |
                    <editable-span :disable="mode !== 'preview'" :value="displayResume.email" @edit="onEdit('email', $event)"></editable-span>
                    |
                    <editable-span :disable="mode !== 'preview'" :value="displayResume.phone" @edit="onEdit('phone', $event)"></editable-span>
                </p>
            </section>
            <section class="skill">
                <h2>技能</h2>
                <ul>
                    <li v-for="skill,index in displayResume.skills">
                        <editable-span :disable="mode !== 'preview'" :value="skill.name" @edit="onEdit('skills[' + index +' ].name', $event)"></editable-span>
                        <div class="description">
                            <editable-span :disable="mode !== 'preview'" :value="skill.description" @edit="onEdit('skills[' + index +' ].description', $event)"></editable-span>
                        </div>
                        <span class="remove" v-if="index>3 && mode === 'edit'" @click="removeSkill(index)">X</span>
                    </li>
                    <li class="add" v-if="mode === 'edit'"><span @click="addSkill">
                        添加
                    </span></li>
                </ul>
            </section>
            <section class="projects">
                <h2>项目经历</h2>
                <ol>
                    <li v-for="project,index in displayResume.projects">
                        <header>
                            <div class="start">
                                <h3 class="name"><editable-span :disable="mode !== 'preview'" :value="project.name" @edit="onEdit('projects[' + index + '].name', $event)"></editable-span></h3>
                                <span class="link"><editable-span :disable="mode !== 'preview'" :value="project.link" @edit="onEdit('projects[' + index + '].link', $event)"></editable-span></span>
                            </div>
                            <div class="end">
                                <span class="keywords"><editable-span :disable="mode !== 'preview'" :value="project.keywords" @edit="onEdit('projects[' + index + '].keywords', $event)"></editable-span></span>
                            </div>
                        </header>
                        <p class="description"><editable-span :disable="mode !== 'preview'" :value="project.description" @edit="onEdit('projects[' + index + '].description', $event)"></editable-span></p>
                        <span v-if="index>1 && mode === 'edit'" @click="removeProject(index)">X</span>
                    </li>
                    <li class="add" v-if="mode === 'edit'"><span @click="addProject">添加</span></li>
                </ol>
            </section>
        </div>
    `
})