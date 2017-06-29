var components = window.lib.app.components;
var search = React.createElement(components.Search, {});
var container = React.createElement('div', {},
  search
);

ReactDOM.render(container, document.querySelector('.js-topNav'));