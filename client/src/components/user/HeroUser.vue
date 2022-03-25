<template>
    <div class="hero-video">
        <video id="videoHero" autoplay muted loop>
            <source src="../../assets/videos/herovideo.mp4" type="video/mp4">
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
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, #111 75%, transparent 94%);

    video {
        position: absolute;
        width: auto;
        height: auto;
        min-width: 100%;
        min-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>