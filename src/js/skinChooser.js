Vue.component('skin-chooser',{
    methods:{
        setTheme(name){
            document.body.className = name
        },
    },
    template:`
    <div class="skinChooser" v-cloak>
        <div class="skinChooser-bg">
            <button @click="setTheme('defalut')">默认</button>
            <button @click="setTheme('blue-grey')">蓝灰色</button>
            <button @click="$emit('close-skin')" type="button">关闭</button>
        </div>
    </div>
</div>
    `,
})