import Grid from './Grid.vue';

/* istanbul ignore next */
Grid.install = function(Vue) {
  if (Vue) {
    Vue.component(Grid.name, Grid);
  }
};

const install = function(Vue) {
  Vue.component(Grid.name, Grid);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Grid;
