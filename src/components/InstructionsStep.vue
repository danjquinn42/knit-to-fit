<template>
    <div class="prose max-w-none">
        <p style="white-space: pre-line">{{ instructions }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{ instructions: string }>();
</script>

<style scoped>
.instructions-step {
    margin-bottom: 2rem;
}
</style>
