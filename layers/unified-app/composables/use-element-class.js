

export function useElementClass({ el, classes }) {

  onMounted(() => {
    toValue(el).classList.add(classes);
  });

  onUnmounted(() => {
    toValue(el).classList.remove(classes);
  });

}