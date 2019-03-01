// Put all the javascript code here, that you want to execute after page load.

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
    doAutoFormat().catch(e => console.error(e));
  }
});

let userOptions = {
  trailingComma: 'all',
  arrowParens: 'always',
  printWidth: 150,
  singleQuote: true,
};

async function doAutoFormat() {
  let userOptions; 
  try {
    let settings = await browser.storage.local.get('userOptions');
    userOptions = JSON.parse(settings.userOptions);
  } catch (e) {
    userOptions = {};
  }
  let application = window.wrappedJSObject.application;
  let editor = application.editor();
  let cursor = editor.doc.getCursor();
  let code = editor.doc.getValue();
  let filepath = application.selectedFile().path();
  let formattedCode = prettier.format(code, Object.assign({
    plugins: prettierPlugins,
    filepath: filepath
  }, userOptions));
  editor.doc.setValue(formattedCode);
  editor.doc.setCursor(cursor);
  notification.classList.remove('hidden');
  notificationTimeout = setTimeout(function () {
    notification.classList.add('hidden');
  }, 5000);
}