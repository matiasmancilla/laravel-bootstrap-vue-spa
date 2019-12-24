<template>
    <div class="container">
        <h1>Home</h1>
        <button @click="asd()"> asdasd</button>
    </div>
</template>

<script>
export default {
    created(){
        console.log("view Home")
       

    },
    methods:{
        asd(){
             this.$store.commit('showLoader');
        }
    }
}
</script>