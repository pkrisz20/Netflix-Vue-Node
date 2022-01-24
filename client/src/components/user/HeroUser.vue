<template>
    <div class="hero-video">
        <video autoplay muted loop>
            <source src="../../assets/videos/nowayhome.mp4" type="video/mp4">
        </video>
    </div>
</template>

<script>

    export default {
        name: "UserHero",
    }
</script>

<style lang="scss" scoped>
.hero-video {
    width: 100%;
    height: 90vh;
    padding: 45px 0 0;

    video {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
        mask-image: linear-gradient(to bottom, rgba($c-dark-theme, 1) 5%, transparent 95%);
    }
}
</style>