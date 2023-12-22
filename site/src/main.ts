import App from './components/App.svelte'
import { init } from "./init";

init();

const app = new App({
  target: document.getElementById('app')
});

export default app;
