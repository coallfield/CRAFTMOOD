<template>
<div class="profile-settings">
            <div class="logout-button-container">
            <AppButton @click="logout">LOG OUT</AppButton>
            </div>
            <div class="add-moodboard-button-container">
                <AppButton @click="openCreatingWindow">ADD MOODBOARD</AppButton>
            </div>
        </div>
</template>

<script setup lang="ts">

    const emits = defineEmits(['logout', 'openCreatingWindow'])

    const logout = () => {
        emits('logout')
    }

    const openCreatingWindow = () => {
        emits('openCreatingWindow', true)
    }
</script>

<style scoped>
.profile-settings {
    display: flex;
    flex-direction: row;
    grid-gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 30px;
}
@media(max-width: 800px) {
    .profile-settings {
        flex-direction: column;
    }
}
</style>