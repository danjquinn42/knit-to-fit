<script setup lang="ts">
import type { ToeUpValues } from "./types"; // or inline the shape
const props = defineProps<{ values: ToeUpValues }>();
const { sockStitches } = props.values;
</script>

<template>
    <section class="prose">
        <p>
            Knit 1 round even, distributing stitches as needed for your needles.
        </p>

        <p>
            <strong>ROUND 1 (increase round):</strong>
            <k1 /> , <m1 /> , knit to 1 st before center of round, <m1 /> ,
            <k2 /> , <m1 /> , knit to 1 st before end of round, <m1 /> ,
            <k1 /> — 4 sts increased.
        </p>

        <p><strong>ROUND 2:</strong> knit even.</p>

        <p>
            Repeat Rounds 1 and 2 until there are
            <strong>{{ sockStitches }}</strong>
            Sock Stitches total. (The first half of each round forms the instep;
            the second half forms the sole. Arrange stitches if needed so the
            sole stitches are grouped.)
        </p>
    </section>
</template>
