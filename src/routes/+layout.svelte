<script>
  import "@fontsource/open-sans";
</script>

<slot />

<svelte:head>
  <title>JSON - Env Variables Converter</title>
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
    grid-template-rows: 100vh auto;
    grid-template-areas: "main" "footer";
    overflow-x: hidden;
    font-family: "Open Sans", sans-serif;
  }

  :global(main) {
    grid-area: main;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  :global(footer) {
    grid-area: footer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 1rem;
    margin: 0 2.5rem;
    border-top: 1px solid black;
  }
</style>
