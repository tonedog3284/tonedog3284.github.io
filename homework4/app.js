if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
	   navigator.serviceWorker.register('/sw.js')
	      .then(registration => console.log('SW registered'))
		  .catch(err => console.log(`SW not registered - Error: ${err}`))
    })
} else {
    console.log('Service Worker is not supported in this browser.')
}
function changeTheme() {
    var e = document.getElementById("themes");
    var theme = e.options[e.selectedIndex].value;
    document.getElementById("shelf").style.backgroundImage = "url(" + theme + ")";
}
'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
}
function installPWA(evt) {
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute('hidden', true);
  deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted', choice);
      } else {
        console.log('User denied', choice);
      }
      deferredInstallPrompt = null;
    });
}
window.addEventListener('appinstalled', logAppInstalled);
function logAppInstalled(evt) {
  console.log('PWA was installed.', evt);
}
