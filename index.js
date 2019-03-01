const prettier = require("prettier");

window.addEventListener('keypress', function (e) {
  console.log('k', e.key);
  if (e.key === 'π' && e.ctrlKey && e.altKey & !e.shiftKey && !e.metaKey) {
    let code = window.wrappedJSObject.application.editor().doc.getValue();
    let filepath = window.wrappedJSObject.application.selectedFile().path();
    console.log(filepath);
    window.wrappedJSObject.application.editor().doc.setValue(
      prettier.format(code, {
        plugins: prettierPlugins,
        filepath: filepath
      })
    );
    console.log('formatted code!');
  }
});