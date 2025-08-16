<template>
    <div class="p-4 max-w-6xl mx-auto">
        <va-card outlined>
            <va-card-title>Toe-Up Instructions</va-card-title>

            <va-card-content>
                <div class="layout">
                    <aside class="sidebar">
                        <va-collapse v-model="sidebarOpen">
                            <va-list>
                                <va-list-item
                                    v-for="s in steps"
                                    :key="s.name"
                                    :class="[
                                        'step-item',
                                        { active: s.name === activeStep },
                                    ]"
                                    @click="goTo(s.name)"
                                >
                                    <va-list-item-section>
                                        <va-list-item-label>
                                            {{ s.name }}. {{ s.label }}
                                        </va-list-item-label>
                                    </va-list-item-section>
                                </va-list-item>
                            </va-list>
                        </va-collapse>
                    </aside>

                    <!-- Main content -->
                    <main class="content">
                        <instructions-step :step="currentStep">
                            <component :is="steps[activeStep - 1].component" />
                        </instructions-step>

                        <div class="flex gap-2 justify-between mt-3">
                            <va-button
                                :disabled="activeStep <= minStep"
                                @click="goTo(activeStep - 1)"
                                preset="secondary"
                            >
                                Back
                            </va-button>
                            <va-button
                                :disabled="activeStep >= maxStep"
                                @click="goTo(activeStep + 1)"
                                color="primary"
                            >
                                Next
                            </va-button>
                        </div>
                    </main>
                </div>
            </va-card-content>
        </va-card>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import InstructionsStep from "./InstructionsStep.vue";

import JudysMagicCastOn from "../steps/JudysMagicCastOn.vue";

const route = useRoute();
const router = useRouter();

const minStep = 1;
const steps = ref([
    { name: 1, label: "Judy's Magic Cast On", component: JudysMagicCastOn },
    // add more steps later…
]);
const maxStep = computed(() => steps.value.length);

const sidebarOpen = ref(false); // collapsed by default

// read from route (strings -> numbers)
const x = computed(() => Number(route.query.x ?? NaN));
const y = computed(() => Number(route.query.y ?? NaN));
const footCirc = computed(() => Number(route.query.footCirc ?? NaN));

// stepper state (pure number)
const activeStep = ref<number>(minStep);

onMounted(() => {
    const stepFromQuery = Number(route.query.step ?? minStep);
    activeStep.value = clamp(stepFromQuery, minStep, maxStep.value);
});

// keep URL in sync when navigating steps
watch(activeStep, (s) => {
    router.replace({
        path: route.path,
        query: {
            ...route.query,
            step: String(clamp(s, minStep, maxStep.value)),
        },
    });
});

// sync UI if the URL changes externally
watch(
    () => route.query.step,
    (val) => {
        const s = Number(val ?? minStep);
        activeStep.value = clamp(s, minStep, maxStep.value);
    },
);

const currentStep = computed(() => {
    return (
        steps.value.find((s) => s.name === activeStep.value) ?? steps.value[0]
    );
});

function goTo(step: number) {
    activeStep.value = clamp(step, minStep, maxStep.value);
}

function clamp(n: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, n));
}
</script>

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

/* Small screens: sidebar above content */
@media (max-width: 768px) {
    .layout {
        grid-template-columns: 1fr;
    }
}
</style>
