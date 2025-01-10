<script lang="ts">
  function greet() {
    alert("Welcome to Svelte!");
  }
  let { onClick } = $props();
</script>

<button onclick={onClick}>click me</button>

<style>
  button {
    font-size: 2em;
  }
</style>
