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
    <textarea
      class="edit-textarea"
      bind:value={textareaValue}
      aria-label="JSON"
    />
    <h2>Env Variables</h2>
    <div class="result-container">
      <pre><code>{$converter}</code></pre>
      <button type="button" class="clipboard-button" on:click={copyTextarea}>
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
    align-self: center;
  }

  h2 {
    padding: 1rem;
  }

  .grid-section {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 40% auto 40%;
    width: 100%;
    height: 100%;
  }

  .edit-textarea {
    justify-self: center;
    resize: none;
    margin: 0;
    padding: 2px;
    width: calc(
      100% - 4px - 4px
    ); /* The first 4px is native the border width and the second one is for the padding  */
  }

  .result-container {
    margin-top: 0;
    background-color: rgb(220, 220, 220);
    position: relative;
    width: 100%;
  }

  .result-container > pre {
    padding: 1rem;
    margin: 0;
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
  }

  .clipboard-button > div {
    display: flex;
  }

  .result-container:hover > .clipboard-button {
    display: block;
  }

  @media (min-width: 800px) {
    .grid-section {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: min-content 80%;
      grid-auto-flow: column;
      height: 75%;
      column-gap: 5rem;
    }
  }
</style>
