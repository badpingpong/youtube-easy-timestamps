export const ControlBarStampClickEvent = new CustomEvent('onControlBarStampClick')
export const emitControlBarStampClickEvent = () => window.dispatchEvent(ControlBarStampClickEvent)