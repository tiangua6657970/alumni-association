import { reactive, ref } from 'vue'

export const selectedAlumniList = reactive([])
export const isInSelectedAlumniList = target => selectedAlumniList.some(item => item.id === target.id)

export const selectedAlumniAssociation = ref()