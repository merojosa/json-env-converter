<script lang="ts">
  let textareaValue = "";

  function calculateCodeValue(value: string) {
    let json = {};
    try {
      json = JSON.parse(value);
    } catch (e) {
      return "Incorrect JSON";
    }

    if (Array.isArray(json)) {
      return "The JSON starts with an array";
    }

    const entries = Object.entries(json);

    return entries.reduce((codeValue, [envName, value]) => {
      return codeValue.concat(`${envName}=${value}\n`);
    }, "");
  }

  $: codeValue = calculateCodeValue(textareaValue);
</script>

<main>
  <h1>JSON - Envs Variables Converter</h1>
  <section class="grid-section">
    <h2>JSON</h2>

    <textarea bind:value={textareaValue} class="edit-textarea" />

    <h2>Envs Variables</h2>
    <div class="result-container">
      <pre><code>{codeValue}</code></pre>
    </div>
  </section>
</main>

<svelte:head>
  <title>JSON - Envs Variables Converter</title>
  <meta
    name="description"
    content="A JSON-Environments variables online converter"
  />
</svelte:head>

<style>
  :global(body) {
    all: unset;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "main" "footer";
    overflow-x: hidden;
  }

  h1,
  h2 {
    margin: 0;
    text-align: center;
  }

  h2 {
    padding: 1rem;
  }

  main {
    grid-area: main;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  }
</style>
