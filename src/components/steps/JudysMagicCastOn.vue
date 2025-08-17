<template>
    <section>
        <h2 class="mb-2">Judy's Magic Cast On</h2>

        <p class="mb-2">
            Cast on <b>{{ values.castOnStitches }}</b> stitches total ({{
                Math.floor(values.castOnStitches / 2)
            }}
            per needle).
        </p>

        <ol class="mb-3">
            <li>
                Hold two needles tip-to-tip. Tail over index finger, working
                yarn over thumb from back.
                <VaBadge text="VA" color="primary" />
            </li>
            <li>
                Twist once so strands cross
                <VaButton preset="plain" class="inline-button"> Plain </VaButton
                >(anchors first pair).
            </li>
            <li>
                Alternate: bottom strand over top needle, then top strand over
                bottom needle, until each has half.
            </li>
            <li>
                Verify total (<b>{{ values.castOnStitches }}</b
                >). Turn, knit across top needle, rotate, knit across bottom.
            </li>
        </ol>

        <figure class="img-wrap" @click="isFull = !isFull">
            <img :src="imageSrc" :alt="alt" :class="{ full: isFull }" />
            <figcaption class="cap">
                {{ isFull ? "Tap to close" : "Tap to view full screen" }}
            </figcaption>
        </figure>

        <div v-if="isFull" class="overlay" @click="isFull = false">
            <img :src="imageSrc" :alt="alt" class="full-img" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { getToeUpValues } from "../../formulas/toe-up";
const props = withDefaults(
    defineProps<{
        x: number;
        y: number;
        footCirc: number;
        imageSrc?: string;
        alt?: string;
        narrowFoot?: boolean;
    }>(),
    {
        imageSrc: "/judys-magic-cast-on.jpg",
        alt: "Judy's Magic Cast-On diagram",
        narrowFoot: false,
    },
);

const values = computed(() =>
    getToeUpValues(
        { x: props.x, y: props.y },
        props.footCirc,
        props.narrowFoot,
    ),
);

const isFull = ref(false);
</script>

<style scoped>
.mb-2 {
    margin-bottom: 0.5rem;
}
.mb-3 {
    margin-bottom: 0.75rem;
}
.img-wrap {
    margin: 0;
    cursor: zoom-in;
}
.img-wrap img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.2s ease;
}
.cap {
    font-size: 0.8rem;
    opacity: 0.7;
    margin-top: 0.25rem;
}

/* overlay */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: zoom-out;
}
.full-img {
    max-width: 100%;
    max-height: 100%;
}

.inline-button {
    border: none;
    margin: none;
    padding: none;
    position: relative;
    top: 0.2em;
}
</style>
