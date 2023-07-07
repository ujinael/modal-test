import {type Plugin } from "vue";
import {phoneMask} from "./phone_mask"

export const installDirectives:Plugin = {
install(app, ...options) {
    app.directive("phone-mask",phoneMask)


},

} 