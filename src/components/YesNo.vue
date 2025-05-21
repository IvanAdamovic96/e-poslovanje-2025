<script lang="ts" setup>
export interface YesNoProps {
    data: boolean
}

const { data } = defineProps<YesNoProps>()
</script>

<template>
    <span v-if="data">✅Yes</span>
    <span v-else>❌No</span>
</template>