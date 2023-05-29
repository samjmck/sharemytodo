import App from './components/App.svelte'
import { init } from "./init";

init();

const app = new App({
  target: document.getElementById('app')
});

if(window.location.pathname === "/") {
  document.body.innerHTML += `
  <script async defer src="https://a.sharemytodo.com/latest.js"></script>
  <noscript><img src="https://a.sharemytodo.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
  `;
}

export default app;
