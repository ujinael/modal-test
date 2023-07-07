import {type Plugin,type Ref, inject, reactive, ref } from "vue"
import {ModalContainer} from "./"
export const useModal = ()=>{
const modal = reactive<ModalContainer>(inject("modal")!)
const hideModal =()=>{
    modal.hide()
}

const closeEventRef = inject<Ref<(hideModal:()=>void)=>void>>('closeEventRef',
ref(()=>{})
);

const closeModalInterceptor = (callback:(hideModal:()=>void)=>void)=>{
    closeEventRef.value = callback.bind(undefined,hideModal)

}
return {modal,hideModal,closeModalInterceptor}
}
export const installModalPlugin:Plugin = {
    
    install(app){
const container = new ModalContainer()

        app.provide("modal",container)
    }
}