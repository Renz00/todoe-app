<script setup>
//Components
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <div>
        <Navbar />
        <!-- Add transitions to navigation with customizable css classes -->
        <Router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component"/>
            </transition>
        </Router-view>
        <Footer  />
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
