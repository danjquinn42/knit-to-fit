<script setup lang="ts">
import type { ToeUpValues } from "./types"; // or inline the shape
const props = defineProps<{ values: ToeUpValues }>();
const { heelAndGussetLength } = props.values;
</script>

<template>
    <section class="prose">
        <p>
            Work even in rounds until the sock measures
            <strong>{{ heelAndGussetLength.toFixed(2) }}"</strong>
            (Heel/Gusset Length) less than the finished sock foot length,
            measured from cast-on at tip of toe.
        </p>
    </section>
</template>
