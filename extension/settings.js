const userOptionsEl = document.querySelector('.user-config');
const saveButton = document.querySelector('.save');

let oldConfig;

userOptionsEl.addEventListener('input', checkChanges);
userOptionsEl.addEventListener('change', checkChanges);

function checkChanges () {
  let userOptions = userOptionsEl.value;
  let valid = true;
  try {
    JSON.parse(userOptions);
  } catch (e) {
    valid = false;
  }
  if (valid) {
    userOptionsEl.classList.remove('error');
    saveButton.disabled = false;
  } else {
    userOptionsEl.classList.add('error');
    saveButton.disabled = true;
  }
}

saveButton.addEventListener('click', async function (e) {
  let userOptions = userOptionsEl.value;
  if (userOptions) {
    await browser.storage.local.set({ userOptions });
    oldConfig = userOptions;
    checkChanges();
  }
});

window.addEventListener('load', async function () {
  let settings = await browser.storage.local.get('userOptions');
  let userOptions = settings.userOptions || '{}';
  oldConfig = userOptions;
  userOptionsEl.value = userOptions;
  saveButton.disabled = true;
});

