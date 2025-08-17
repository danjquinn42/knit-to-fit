<script setup lang="ts">
import type { ToeUpValues } from "./types";
const props = defineProps<{ values: ToeUpValues }>();
const { gussetStitchesPerSide, stitchCountBeforeHeelTurn } = props.values;
</script>

<template>
    <section class="prose">
        <p>
            <em>Note:</em> Keep increased gusset stitches grouped with the sole
            stitches; place markers around the heel stitches; increases are
            worked at the edges of the sole stitches.
        </p>

        <p>
            <strong>SET-UP ROUND:</strong>
            Knit instep stitches; <m1r /> , place marker for heel, knit to end
            of round, place second heel marker, <m1l /> — 2 gusset stitches
            increased.
        </p>

        <p><strong>ROUND 2:</strong> knit.</p>

        <p>
            <strong>ROUND 3:</strong>
            Knit instep stitches; <m1r />, knit to end of round, <m1l /> — 2
            gusset stitches increased.
        </p>

        <p><strong>ROUND 4:</strong> knit.</p>

        <p>
            Repeat Rounds 3 & 4 until you’ve increased
            <strong>{{ gussetStitchesPerSide }}</strong> Gusset Stitches per
            Side — <strong>{{ stitchCountBeforeHeelTurn }}</strong> Total Sock
            Plus Gusset Stitches.
        </p>
    </section>
</template>
