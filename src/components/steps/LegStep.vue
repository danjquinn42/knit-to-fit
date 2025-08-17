<script setup lang="ts">
import type { ToeUpValues } from "./types";
const props = defineProps<{ values: ToeUpValues }>();
const { sockStitches } = props.values;
</script>

<template>
    <section class="prose">
        <p>With RS facing, rejoin for working in rounds:</p>

        <p>
            <strong>SET-UP ROUND:</strong>
            <sl1-wyib /> , knit to 1 st before first gusset stitch, <ssk />;
            knit across instep; <k2tog /> , knit to end of sole — 2 gusset sts
            decreased; <strong>{{ sockStitches }}</strong> Sock Stitches remain.
        </p>

        <p>
            Continue in stockinette until leg measures about 2" (5 cm) less than
            desired total length.
        </p>
    </section>
</template>
