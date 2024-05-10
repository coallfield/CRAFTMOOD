<template>
    <div class="single-card-info__buttons">
        <AppButton @click="$router.go(-1)">BACK</AppButton>
        <div v-if="moodboadStore.isError && moodboadStore.isCurrentPage" class="single-card-info__buttons__error-message">{{ moodboadStore.errorMessage }}</div>  
        <div v-else-if="moodboadStore.isSaved && moodboadStore.isCurrentPage" class="single-card-info__buttons__success-message">IMAGE SUCCESSFULLY SAVED</div>
        <div v-else class="single-card-info__buttons__not-error">
            <div v-if="moodboadStore.isSaving && moodboadStore.isCurrentPage" class="single-card-info__buttons__saving">SAVING...</div>
            <SelectButton v-else></SelectButton>
        </div>

    </div>

</template>

<script lang="ts" setup>
import { useMoodboardsStore } from '@/stores/useMoodboardsStore';

import SelectButton from './SelectButton.vue';
const moodboadStore = useMoodboardsStore()

</script>


<style scoped>

.single-card-info__buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-gap: 40px;
    padding-bottom: 40px;;
}

.single-card-info__buttons__error-message {
  font-size: 1.5rem;
  color: rgb(197, 13, 13);

}
.single-card-info__buttons__success-message {
  font-size: 1.5rem;
  color: rgb(61, 211, 61)
}
.single-card-info__buttons__saving {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 370px;
  height: 110px;
  font-size: 1.5rem;
}

@media(max-width: 830px) {
  .single-card-info__buttons {
    flex-direction: column;
  }
}
@media (max-width: 345px) {
    .single-card-info__buttons__success-message {
        text-align: center;
    }
}
</style>