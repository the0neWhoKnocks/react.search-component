# React Search Component

A Search component built with React that features:

- Random auto-completion results based on what the user typed.
  - Result item has user query highlighted.
- Unicode characters for icons (no image dependencies).
- Random simulated request times for:
  - Auto-completion results
  - Suggestion results
- Once suggestions have loaded, their results are cached for snappier hover times.
- Accessibility (all items can be navigated to and interacted with via the keyboard).
- Responsive
  - A majority of the CSS utilizes `em`s.
  - Suggestion results scroll when the viewing frame is smaller than the list.

![react - search component](https://user-images.githubusercontent.com/344140/27714171-2f641622-5ce4-11e7-87b7-a47017890930.gif)
![react - search component mobile](https://user-images.githubusercontent.com/344140/27714172-2f64f65a-5ce4-11e7-9eb1-6f29e443e003.gif)

---

## Installation

```sh
npm i -dd
```

---

## Run

To compile and start a webpack server

```sh
npm start
```

Navigate to [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/).
Notice that the bundle isn't written to the file system, but rather served from
memory via the `publicPath` prop in `webpack.config.js`.

To just compile

```sh
npm run compile

# to watch for changes
npm run compile -- -w
```

You can then navigate to `public/` and open `index.html` in a browser. You'll
notice without the WebPack server the bundle is actually output to the file
system and is much smaller. 
