<template>
    <div class="p-4 max-w-xl mx-auto">
        <va-card outlined>
            <va-card-title>Toe-Up Sock Calculator</va-card-title>
            <va-card-content>
                <va-form @submit.prevent="onStart">
                    <div class="grid gap-3">
                        <va-input
                            v-model.number="xGauge"
                            type="number"
                            label="X Gauge (sts/in)"
                            min="1"
                            step="0.1"
                            required
                        />
                        <va-input
                            v-model.number="yGauge"
                            type="number"
                            label="Y Gauge (rows/in)"
                            min="1"
                            step="0.1"
                            required
                        />
                        <va-input
                            v-model.number="finishedCircumference"
                            type="number"
                            label="Finished Circumference (in)"
                            min="1"
                            step="0.1"
                            required
                        />
                        <div class="flex gap-2 pt-2">
                            <va-button
                                :disabled="disabled"
                                @click="onStart"
                                color="primary"
                                >Start knitting</va-button
                            >
                        </div>
                    </div>
                </va-form>
            </va-card-content>
        </va-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const xGauge = ref<number | null>(null);
const yGauge = ref<number | null>(null);
const finishedCircumference = ref<number | null>(null);

const disabled = computed(
    () =>
        xGauge.value == null ||
        yGauge.value == null ||
        finishedCircumference.value == null,
);

function onStart() {
    if (disabled.value) return;
    router.push({
        path: "/to-up/instructions",
        query: {
            step: "1",
            x: String(xGauge.value),
            y: String(yGauge.value),
            footCirc: String(finishedCircumference.value),
        },
    });
}
</script>

<style scoped>
.max-w-xl {
    max-width: 36rem;
}
</style>
