<template>
    <div class="container py-5 text-center">
        <h1>404</h1>
        <p>The page <code>{{ $route.params.notFound }}</code> you're looking for is not foud :(</p>
        <router-link :to="{ name: 'tasks' }">Back to your tasks</router-link>
    </div>
</template>
