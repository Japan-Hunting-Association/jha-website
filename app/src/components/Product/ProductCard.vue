<script setup lang="ts">
import type Product from "@/module/interface"

type Props = {
    product: Product
}

let prop = defineProps<Props>()
</script>

<template>
    <nuxt-link :to="`${ product.page_url }`" class="product-card">
        <img src="assets/sample/can1.png" class="image">
        <div class="title">
            {{ $i18n.locale == 'ja' ? product.name_ja : product.name_en}}
        </div>
    </nuxt-link>
</template>

<style scoped>
.product-card {

}

.title {
    margin: 0 auto; 
}

.image {
    width: 100%;
    border-radius: 10px;
}
</style>