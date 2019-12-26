<template>
    <div class="container">
        <h1>Home</h1>
        <button @click="getData()"> Progress bar test</button>
        <button @click="showLoader()"> Loader test</button>
        <button @click="notify()"> Notification test</button>
    </div>
</template>

<script>
export default {
    created(){
        console.log("view Home")
    },
    methods:{
        getData(){
            axios.get('/')
        },
        showLoader(){
            this.$store.commit('showLoader')
            setTimeout(()=> this.$store.commit('hideLoader') , 1500);
        },
        notify(){
            this.$notify({
                type: 'success',
                group: 'foo',
                title: 'Success',
                text: "msgSuccess"
            })
        }

    }
}
</script>