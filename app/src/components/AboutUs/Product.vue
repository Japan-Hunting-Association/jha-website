<script setup lang="ts">
let prop = defineProps({
    name: String,
    summary: String
})
console.log(prop.name)
</script>

<template>
    <div class="product">
        <img v-slide-in-L v-test src='~assets/parts/plane-can.png' class="can">
        <div class="info">
            <div class="name">
                {{ prop.name }}
            </div>
            <div class="summary">
                {{ prop.summary }}
            </div>
        </div>
    </div>
</template>

<style scoped>

.product {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
}

.can {
    width: 150px;
    margin: 0 30px;
}

.name{
    font-size: 2rem;
    font-weight: bold;   
     
}
</style>