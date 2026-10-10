let installPrompt = null;

const installButtons = [
  { button: document.getElementById("dashboard-install-app"), status: document.getElementById("dashboard-install-status") }
].filter(({ button }) => button);

function showInstallStatus(message) {
  for (const { status } of installButtons) {
    if (!status) continue;
    status.textContent = message;
    status.hidden = false;
  }
}

function isInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

if (isInstalled()) {
  for (const { button } of installButtons) button.hidden = true;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  for (const { button } of installButtons) button.hidden = true;
  showInstallStatus("Smart Campus has been installed on this device.");
});

for (const { button } of installButtons) {
  button.addEventListener("click", async () => {
    if (!installPrompt) {
      const isAppleMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      showInstallStatus(isAppleMobile
        ? "To install, open this site in Safari, tap Share, then choose Add to Home Screen."
        : "To install, use your browser's Install app or Add to Home Screen option in the menu.");
      return;
    }

    const prompt = installPrompt;
    installPrompt = null;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "dismissed") showInstallStatus("Installation was cancelled. You can install later from your browser menu.");
  });
}

if ("serviceWorker" in navigator && window.isSecureContext) {
  navigator.serviceWorker.register("/service-worker.js")
    .catch((error) => {
      console.error("Could not register the offline app shell.", error);
      showInstallStatus("Offline app setup failed. Check your connection and reload the page.");
    });
}
