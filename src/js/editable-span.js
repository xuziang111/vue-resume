Vue.component('editable-span',{
    props:["value","disable"],
    data:{
        editVisible:'false',
    },
    template:`
                  <span  class="editableSpan">
                    <span v-show="!editing">{{value}}</span>
                    <input v-show="editing" type="text" v-bind:value="value" @input=" triggerEdit">
                    <button v-if="disable" v-on:click="editing = !editing">编辑</button>
                  </span>
        `,
    data(){
        return{
            editing:false
        }
    },
    methods:{
        triggerEdit(e){
            this.$emit('edit',e.target.value)
        }
    }
})
