import { serverConfig } from '@/service/base'
import { ref } from 'vue'

export default function useUpload() {
  const uploadRef = ref()
  const fileList = ref([])
  const uploadConfig = {
    action: serverConfig.baseUrl,
    header: serverConfig.header,
    fileList: [],
  }

  function upload() {
    uploadRef.value.upload()
  }

  function handleRemove(index, lists) {
    console.log('handleRemove')
  }

  function handleOversize(file, lists, name) {
    console.log('handleOversize')
  }

  function handleSuccess(data, index, lists, name) {
    console.log('handleSuccess')
  }

  function handleChange(res, index, lists, name) {
    console.log('handleChange')
  }

  function handleError(res, index, lists, name) {
    console.log('handleError')
  }

  function handleProgress(res, index, lists, name) {
    console.log('handleProgress')
  }

  function handleUploaded(lists, name) {
    console.log('handleUploaded')
  }

  function handleChooseComplete(list, name){
    console.log('handleChooseComplete', list)
    fileList.value = list
    console.log(fileList,'fileList')
  }

  function handleChooseError(error) {
    console.log('handleChooseError')
  }

  function handleListChange(lists, name) {
    console.log('handleListChange')
  }

  function beforeUpload(index, list) {
    console.log('beforeUpload')
  }

  function beforeRemove(index, lists) {
    console.log('beforeRemove')
  }

  return {
    uploadRef,
    fileList,
    uploadConfig,
    upload,
    handleRemove,
    handleOversize,
    handleSuccess,
    handleChange,
    handleError,
    handleProgress,
    handleUploaded,
    handleChooseComplete,
    handleChooseError,
    handleListChange,
    beforeUpload,
    beforeRemove
  }
}
