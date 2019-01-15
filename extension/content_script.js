// Put all the javascript code here, that you want to execute after page load.

console.log('prettier', prettier);
console.log('babylon', prettierPlugins);

browser.runtime.onMessage.addListener(msg => {
  if (msg.action === 'format') {
    doAutoFormat();
  }
});

let notification = document.createElement('div');
notification.classList = 'notification notifyAutoFormat hidden';
notification.innerHTML = 'code formatted!';
document.querySelector('.notifications').appendChild(notification);
let notificationTimeout;

window.addEventListener('keypress', function (e) {
  if (e.key === 'ƒ' && e.ctrlKey && e.altKey & !e.shiftKey && !e.metaKey) {
    doAutoFormat();
  }
});

function doAutoFormat() {
  let editor = window.wrappedJSObject.application.editor();
  let cursor = editor.doc.getCursor();
  let code = editor.doc.getValue();
  let formattedCode = prettier.format(code, {
    parser: 'babylon',
    plugins: prettierPlugins
  });
  editor.doc.setValue(formattedCode);
  editor.doc.setCursor(cursor);
  notification.classList.remove('hidden');
  notificationTimeout = setTimeout(function () {
    notification.classList.add('hidden');
  }, 5000);
}