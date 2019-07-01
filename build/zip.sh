mkdir -p dist/assets/vue/Grid


cp -r dist/grid.css dist/grid.umd.min.js dist/grid.umd.min.js.map dist/assets/vue/Grid

cd ./dist/

zip -q -r -o  Grid.zip assets/

cd ../

cp ./README.md ../../docs/grid/

cd ../../docs/

git add .
git commit -m 'docs'
git push https://github.com/vitozyf/component_docs.git master

cd ../Component/grid/
