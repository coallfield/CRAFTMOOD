<template>
    <div @click.stop="closeCreatingWindow" v-if="props.isAddingMoodboard" class="add-moodboard-popup">
        <div @click.stop class="add-moodboard-popup__name-window">
            <h1 class="add-moodboard-popup__name-window__title">COME UP WITH THE NAME</h1>
            <h5 class="add-moodboard-popup__name-window__name-error" v-if="isAlreadyExists">A moodboard with this name already exists</h5>
            <FormInput 
                type="text"
                :class="errorAtteintion ? 'add-moodboard-popup__name-window__input_error' : ''"
                v-bind:value="moodboardName"
                @input="moodboardName = $event.target.value"
                width="370px" 
                placeholder="Nature aesthetics">
            </FormInput>
            <AppButton :disabled="isSaving" @click="createOrRenameMoodboard()">{{ !isSaving ? (props.moodboardId ? 'RENAME' : 'CREATE') : 'WAIT...' }}</AppButton>
            
        </div>
        <FailedMessage v-if="isFailedToCreate">{{ failedMessage }}</FailedMessage>
    </div>

</template>

<script lang="ts" setup>

import { useMoodboardsStore } from '@/stores/useMoodboardsStore';
import { ref } from 'vue';
import FailedMessage from '@/components/FailedMessage.vue';
import { usePhotosStore } from '@/stores/usePhotosStore';

const photosStore = usePhotosStore()
const moodboadStore = useMoodboardsStore()
const moodboardName = ref('')
const errorAtteintion = ref(false)
const isSaving = ref(false)
const isFailedToCreate = ref(false)
const failedMessage = ref('')
const isAlreadyExists = ref(false)



async function createOrRenameMoodboard() {
    errorAtteintion.value = false
    if(moodboardName.value.trim() === '') {
        errorAtteintion.value = true
        setTimeout(() => {
            errorAtteintion.value = false
        }, 2000)
        return
    }
    else if(moodboadStore.moodboards.find(el => el.name === moodboardName.value)) {
        moodboardName.value = ''
        isAlreadyExists.value = true
        setTimeout(() => {
            isAlreadyExists.value = false
        }, 1500)
        return
    }
    try {
        isSaving.value = true
        if(props.moodboardId) {
            const newMoodboard = await moodboadStore.renameMoodboard(moodboardName.value, props.moodboardId)
            emits('setNewMoodboard', newMoodboard)
            await photosStore.getPhotos('Proposed', undefined, undefined, newMoodboard.name, Math.floor(Math.random() * 20) + 1)
        } else {
            await moodboadStore.createMoodboard(moodboardName.value)
            
        }
        emits('closeCreatingWindow', false)
        
    } catch (error) {
        if(error instanceof Error) {
            failedMessage.value = error.message
        }
        isFailedToCreate.value = true
        setTimeout(() => {
            isFailedToCreate.value = false
        }, 1500)
        
    }
    finally {
        isSaving.value = false
        moodboardName.value = ''
    }
}


const props = defineProps<{
    isAddingMoodboard: boolean,
    placeholder?: string,
    moodboardId?: string
}>()

const emits = defineEmits(['closeCreatingWindow', 'setNewMoodboard'])

const closeCreatingWindow = () => {
    emits('closeCreatingWindow', false)
}
</script>


<style scoped>

.add-moodboard-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
}
.add-moodboard-popup__name-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(45, 45, 59);
  padding: 20px;
  border: 1px solid rgb(240, 239, 243) ;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 500px;
  height: 300px;
  display:  flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-gap: 30px;
}
.add-moodboard-popup__name-window__input_error {
    border:  2px solid rgb(197, 13, 13);;
}

.add-moodboard-popup__name-window__name-error {
    position: absolute;
    color: rgb(197, 13, 13);
    top: 70px;
}

@media (max-width: 540px) {
    .add-moodboard-popup__name-window {
        width: 400px;
        height: auto;
    }
    .add-moodboard-popup__name-window__name-error {
        top: 115px
    }
}
@media (max-width: 405px) {
  
    .add-moodboard-popup__name-window {
        width: 350px;
    
    }
}
@media (max-width: 355px) {

.add-moodboard-popup__name-window {
    width: 300px;

}
}
</style>