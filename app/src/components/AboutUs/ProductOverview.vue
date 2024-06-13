<script setup lang="ts">

</script>

<template>
    <div class="section">
        <div class="title">
            こんなビールを作ってます
        </div>
        <AboutUsProduct name="session IPA low-low-low" summary="IPAの味はそのままに低アルコールなビールができました。"/>
        <AboutUsProduct name="numazu craft 1994" summary="漁師町沼津でかつて愛されたプレミアムビールを復刻！"/>
    </div>
</template>

<style scoped>
.section {
    height: fit-content;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    height: 500px;
}

.product {
    display: flex;
    justify-content: center;
    align-items: center;
}

.can {
    width: 150px;
    margin: 0 30px;
}

.name{
    font-size: 2rem;
    font-weight: bold;   
     
}

.to-store{
    font-size: 1.5rem;
    font-weight: bold;
}
</style>