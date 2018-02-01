
import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

export default class ChatWindow extends PolymerElement {

  static get properties() {
    return {
      name: {
        type: String
      },
    };
  }

  static get template() {
    return `
      <style>
      </style>
      <div>hello from chat window</div>`;
  }
}

window.customElements.define('chat-window', ChatWindow);
