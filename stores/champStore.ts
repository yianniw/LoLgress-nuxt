import { defineStore } from "pinia";

export const useChampStore = defineStore('champ', () => {

  const hello = () => console.log("hello");

  return {
    hello
  }
});

// allow hot-reloading
if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}