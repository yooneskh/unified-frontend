

export default {
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else if (to.hash) {
      return {
        selector: to.hash,
        offset: {
          x: 0,
          y: 10
        }
      }
    }
    else {
      return { x: 0, y: 0 }
    }
  },
}