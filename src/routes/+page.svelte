<script lang="ts">
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
  <section>
    <div>
      <h1>JSON to Environment Variables</h1>
      <p class="description">
        No fetching to the server, nothing is stored. Everything stays in the
        browser until you close or reload the page.
      </p>
      <p class="description">
        Check out the <a
          href="https://github.com/merojosa/json-env-converter"
          target="_blank">source code</a
        >!
      </p>
    </div>
    <div class="grid-section">
      <h2>JSON</h2>
      <textarea
        class="edit-textarea textareas"
        bind:value={textareaValue}
        aria-label="JSON"
      ></textarea>
      <h2>Env Variables</h2>
      <div class="result-container textareas">
        <pre><code>{$converter}</code></pre>
        <button type="button" class="clipboard-button" on:click={copyTextarea}>
          <div>
            <Clipboard />
          </div>
        </button>
      </div>
    </div>
  </section>
</main>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  h1,
  h2 {
    margin: 0;
    text-align: center;
    align-self: center;
  }

  h2 {
    padding: 1rem;
    margin-top: 1rem;
  }

  .description {
    text-align: center;
    margin: 0;
  }

  .grid-section {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto 1fr;
    width: 100%;
  }

  .textareas {
    height: 50vh;
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
    overflow-y: auto;
    padding: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: black;
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
    h2 {
      margin: 0;
    }

    .grid-section {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: min-content 80%;
      grid-auto-flow: column;
      column-gap: 5rem;
    }
  }
</style>
