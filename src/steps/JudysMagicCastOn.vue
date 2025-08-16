<!-- JudysMagicCastOn.vue -->
<template>
    <InstructionsStep>
        <h2>Judy's Magic Cast On</h2>
        <p>
            Using Judy’s Magic Cast On, cast on
            <b>{{ castOnCount }}</b> stitches ({{ sockStitches }} total sock
            stitches, adjusted for cast-on).
        </p>
        <ol>
            <li>Hold two needles parallel with tips pointing right.</li>
            <li>
                Loop yarn over bottom needle, then top needle, alternating until
                you have half the stitches on each.
            </li>
            <li>Tighten loops gently, ensuring even tension.</li>
            <li>
                Knit across top needle, then rotate and knit across bottom
                needle.
            </li>
        </ol>

        <div class="image-wrapper" @click="toggleFullscreen">
            <img
                :src="imageSrc"
                alt="Judy's Magic Cast On diagram"
                :class="{ fullscreen: fullscreen }"
            />
        </div>
    </InstructionsStep>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import InstructionsStep from "../components/InstructionsStep.vue";
import { getToeUpValues } from "../formulas/toe-up";
import { useRoute } from "vue-router";

const route = useRoute();
const x = Number(route.query.x ?? 0);
const y = Number(route.query.y ?? 0);
const footCirc = Number(route.query.footCirc ?? 0);

const toeUp = getToeUpValues({ x, y }, footCirc);
const sockStitchesValue = toeUp.sockStitches;
const castOnCount = toeUp.castOnStitches;

const imageSrc = "/judys-magic-cast-on.jpg";
const fullscreen = ref(false);
function toggleFullscreen() {
    fullscreen.value = !fullscreen.value;
}

const sockStitches = computed(() => sockStitchesValue);
</script>

<style scoped>
.image-wrapper {
    margin-top: 1rem;
    cursor: zoom-in;
}
.image-wrapper img {
    max-width: 100%;
    border-radius: 8px;
    transition: all 0.3s ease;
}
.image-wrapper img.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: contain;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    cursor: zoom-out;
}
</style>
