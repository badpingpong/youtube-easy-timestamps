export const menuBarStampClickEvent = new CustomEvent('onMenuBarStampClick')
export const emitMenuBarStampClickEvent = () => window.dispatchEvent(menuBarStampClickEvent)