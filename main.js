'use strict';

const { app, BrowserWindow, Menu, globalShortcut, shell, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;

function sendFullscreenState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('fullscreen-changed', mainWindow.isFullScreen());
  }
}

function toggleFullscreen() {
  if (!mainWindow || mainWindow.isDestroyed()) return false;
  mainWindow.setFullScreen(!mainWindow.isFullScreen());
  return mainWindow.isFullScreen();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'LOGIC LIMIT',
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 620,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#0b0b09',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: !app.isPackaged
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault();
      if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    }
  });

  mainWindow.on('enter-full-screen', sendFullscreenState);
  mainWindow.on('leave-full-screen', sendFullscreenState);
  mainWindow.on('closed', () => { mainWindow = null; });
}

const hasLock = app.requestSingleInstanceLock();
if (!hasLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.setAppUserModelId('tw.logiclimit.game');

  ipcMain.handle('toggle-fullscreen', toggleFullscreen);
  ipcMain.handle('get-fullscreen', () => Boolean(mainWindow && mainWindow.isFullScreen()));
  ipcMain.handle('quit-app', () => { app.quit(); return true; });

  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();

    globalShortcut.register('F11', toggleFullscreen);
    globalShortcut.register('Alt+Enter', toggleFullscreen);
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('will-quit', () => globalShortcut.unregisterAll());
