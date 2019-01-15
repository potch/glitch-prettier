const prettier = require("prettier");

console.log('prettier', prettier);

window.addEventListener('keypress', function (e) {
  console.log('k', e.key);
  if (e.key === 'π' && e.ctrlKey && e.altKey & !e.shiftKey && !e.metaKey) {
    let code = window.wrappedJSObject.application.editor().doc.getValue();
    window.wrappedJSObject.application.editor().doc.setValue(prettier.format(code));
    console.log('formatted code!');
  }
});