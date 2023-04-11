<script lang="ts">
  import Github from "./github.svelte";
  import { converter } from "./converter-store";
  import Clipboard from "./components/clipboard.svelte";

  let textareaValue = "";

  const copyTextarea = async () => {
    try {
      await navigator.clipboard.writeText($converter);
    } catch (err) {
      console.error(err);
    }
  };

  $: converter.fromJsonToEnv(textareaValue);
</script>

<main>
  <h1>JSON - Env Variables Converter</h1>
  <section class="grid-section">
    <h2>JSON</h2>

    <textarea bind:value={textareaValue} class="edit-textarea" />

    <h2>Env Variables</h2>
    <div class="result-container">
      <pre><code>{$converter}</code></pre>
      <button class="clipboard-button" on:click={copyTextarea}>
        <div>
          <Clipboard />
        </div>
      </button>
    </div>
  </section>
</main>
<footer>
  <span>
    Made by <a href="https://jose-andres.dev" target="_blank">Jose Andrés</a>
  </span>
  <div class="icons-container">
    <a href="https://github.com/merojosa/json-env-converter" target="_blank"
      ><Github />
    </a>
  </div>
</footer>

<style>
  h1,
  h2 {
    margin: 0;
    text-align: center;
  }

  h2 {
    padding: 1rem;
  }

  .grid-section {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content 80%;
    grid-auto-flow: column;
    width: 100%;
    height: 75%;
  }

  .edit-textarea {
    justify-self: center;
    width: 80%;
    resize: none;
    margin: 2rem;
    margin-top: 0;
  }

  .result-container {
    padding: 1rem;
    margin: 2rem;
    margin-top: 0;
    background-color: rgb(220, 220, 220);
    position: relative;
  }

  .result-container > pre {
    white-space: break-spaces;
  }

  .result-container > pre > code {
    word-break: break-all;
    word-wrap: break-word;
  }

  .clipboard-button {
    display: none;
    width: 35px;
    height: 35px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .clipboard-button > div {
    display: flex;
  }

  .result-container:hover > .clipboard-button {
    display: block;
    opacity: 1;
  }
</style>
