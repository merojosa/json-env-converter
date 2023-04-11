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
  <meta
    name="google-site-verification"
    content="AcTAAeL5tm0AeyDltMUMjgpxpySMInGYI-H6yIA2kMI"
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
    display: grid;
    align-items: unset;
    grid-template-rows: 10% 90%;
    grid-template-columns: 100%;
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

  @media (min-width: 600px) {
    :global(main) {
      align-items: center;
    }
  }
</style>
