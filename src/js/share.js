Vue.component('share',{
    props:['shareLink'],
    template:`
    <div class="share" v-cloak>
    <div class="share-bg">
        <h2>请分享下面链接</h2>
        <textarea readonly>{{shareLink}}</textarea>
        <button @click="shareVisible = false" type="button">关闭</button>
    </div>
    </div>
    `,
})