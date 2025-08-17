<template>
    <div class="inline-button-wrapper">
        <VaButton
            preset="plain"
            class="inline-button"
            @click="showModal = true"
        >
            {{ abbreviation }}
        </VaButton>

        <VaModal v-model="showModal" hide-default-actions>
            <template #header>
                <h3>{{ abbreviation }}</h3>
            </template>

            <div class="modal-body">
                <slot>
                    <p>{{ description }}</p>
                    <img
                        v-if="image"
                        :src="image"
                        alt="Example of {{ abbreviation }}"
                    />
                </slot>
            </div>

            <template #footer>
                <VaButton @click="showModal = false">Close</VaButton>
            </template>
        </VaModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
    abbreviation: string;
    description?: string;
    image?: string;
}>();

const showModal = ref(false);
</script>

<style scoped>
.inline-button-wrapper {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    margin: 0 2px;
    /*background-color: #192970;*/
    padding: 1px 4px;
    border-radius: 4px;
}

.inline-button {
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    /*color: antiquewhite !important;*/
}

.modal-body {
    padding: 1rem 0;
}
</style>
