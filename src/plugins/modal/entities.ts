import {type AllowedComponentProps,type Component,type VNodeProps, createVNode } from "vue";
// type MyComponentProps = InstanceType<typeof any>["$props"];

type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never;


export class ModalContainer {
  modals: Array<{ modal: Component; closeCallBack: () => void }> = [];

  show<C extends Component>(modal: C, options:ComponentProps<C> , onClose?: () => void) {
    const newModal = createVNode(modal, { ...options });
    this.modals.push({modal:newModal,closeCallBack:onClose ?? this.hide.bind(this)});
  }
  hide() {
    if (this.modals.length) this.modals.pop();
  }
}
export interface DefaultModalOptions {
  title?: string;
  message?: string;
  buttons?: Array<ConfirmButton>;
}
export interface ConfirmButton {
  title: string;
  handler: () => void;
}
