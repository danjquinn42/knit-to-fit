<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { steps } from "./steps/steps";
import InstructionsStep from "../components/InstructionsStep.vue";
import { getToeUpValues } from "../formulas/toe-up";

const route = useRoute();
const router = useRouter();

const minStep = 0;
const maxStep = computed(() => steps.length - 1);

const x = computed(() => Number(route.query.x ?? NaN));
const y = computed(() => Number(route.query.y ?? NaN));
const footCirc = computed(() => Number(route.query.footCirc ?? NaN));

const values = computed(() =>
    getToeUpValues({ x: x.value, y: y.value }, footCirc.value),
);

const sidebarOpen = ref(false); // collapsed by default

const activeStep = ref<number>(minStep);
onMounted(() => {
    activeStep.value = clamp(
        Number(route.query.step ?? minStep),
        minStep,
        maxStep.value,
    );
});
watch(activeStep, (s) => {
    router.replace({
        path: route.path,
        query: {
            ...route.query,
            step: String(clamp(s, minStep, maxStep.value)),
        },
    });
});
watch(
    () => route.query.step,
    (val) => {
        activeStep.value = clamp(
            Number(val ?? minStep),
            minStep,
            maxStep.value,
        );
    },
);

const current = computed(() => steps[activeStep.value] ?? steps[0]);

function goTo(i: number) {
    activeStep.value = clamp(i, minStep, maxStep.value);
}
function clamp(n: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, n));
}
</script>

<template>
    <div class="p-4 max-w-6xl mx-auto">
        <div class="layout">
            <aside class="sidebar">
                <va-collapse v-model="sidebarOpen">
                    <va-list>
                        <va-list-item
                            v-for="(s, i) in steps"
                            :key="s.id"
                            :class="['step-item', { active: i === activeStep }]"
                            @click="goTo(i)"
                        >
                            <va-list-item-section>
                                <va-list-item-label>{{
                                    s.title
                                }}</va-list-item-label>
                            </va-list-item-section>
                        </va-list-item>
                    </va-list>
                </va-collapse>
            </aside>

            <main class="content">
                <component
                    v-if="current.component"
                    :is="current.component"
                    :x="x"
                    :y="y"
                    :footCirc="footCirc"
                />
                <InstructionsStep
                    v-else-if="current.instructions"
                    :instructions="current.instructions(values)"
                />
                <div class="flex gap-2 justify-between mt-3">
                    <va-button
                        :disabled="activeStep <= minStep"
                        @click="goTo(activeStep - 1)"
                        preset="secondary"
                        >Back</va-button
                    >
                    <va-button
                        :disabled="activeStep >= maxStep"
                        @click="goTo(activeStep + 1)"
                        color="primary"
                        >Next</va-button
                    >
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 1rem;
}
.sidebar .step-item {
    cursor: pointer;
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
}
.sidebar .step-item.active {
    background: rgba(0, 0, 0, 0.06);
}
.content {
    min-height: 240px;
}
@media (max-width: 768px) {
    .layout {
        grid-template-columns: 1fr;
    }
}
</style>
