<script setup lang="ts">
import type Product from "@/module/interface";

var url = new URL(window.location.href);
const api_products = url.origin + "/api/products";
const { data } = await useFetch<Product[]>(api_products)
</script>

<template>
    <section>
        <div class="title">{{ $t('products') }}</div>
        <div class="carousel-field">
            <div v-if="data?.length != 0" v-for="r in data" class="card">
                <ProductCard :product=r />
            </div>
            <div v-else>
                {{ $t('no-products') }}
            </div>
        </div>

        <nuxt-link to='/products' class="border-round-button long center with-margin">
            {{ $t('see-more') }}
        </nuxt-link>
    </section>
</template>
  
<style scoped>
section {
    width: 80%;
    margin: auto;
}

.title {
    font-size: 1rem;
    font-weight: bold;
}

.card {
  margin: 10px;
  max-width: 25%;
}

.carousel-field {
  display: flex;
}



.grid-product-icons {
    display: grid;
    width : 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 30px;
    margin: 30px auto;
    padding: 0 100px;
}

.newrelease {
    margin: 0 auto;
    position: relative;
}
 
.newrelease::before {
    content: "";
    top: 0;
    left: 0;
    border-bottom: 4em solid transparent;
    border-left: 4em solid #c12748;
    position: absolute;
    z-index: 100;
}

.newrelease::after {
    content: "New!";
    display: block;
    top: 10px;
    transform: rotate(-45deg);
    color: #fff;
    left: 0;
    position: absolute;
    z-index: 101;
}
</style>