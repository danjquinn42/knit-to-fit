<!-- InstructionsStep.vue -->
<template>
    <div class="instructions-step">
        <slot />
    </div>
</template>

<script setup lang="ts">
// no props needed anymore – we’ll let each step manage its own content
</script>

<style scoped>
.instructions-step {
    margin-bottom: 2rem;
}
</style>
