#!/bin/zsh

# adds vendor assets from installed modules
echo "[ COPYING ] vendor resources"

mkdir -p "./public/js/vendor/"

cp -v "./node_modules/react/dist/react.min.js" "./public/js/vendor/"
cp -v "./node_modules/react-dom/dist/react-dom.min.js" "./public/js/vendor/"
cp -v "./node_modules/prop-types/prop-types.min.js" "./public/js/vendor/"

echo -e "\n[ COPY ] complete"
