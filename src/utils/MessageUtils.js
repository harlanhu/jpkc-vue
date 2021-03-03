import {Message} from "element-ui";

const showMessage = (message, type, duration) => {
  Message({
    message: message,
    type: type,
    duration: duration
  })
}

const showSuccess = message => {
  showMessage(message, "success", 3 * 1000)
}

const showError = message => {
  showMessage(message, "error", 3 * 1000)
}

const showInfo = message => {
  showMessage(message, "info", 3 * 1000)
}

export default {
  showMessage,
  showError,
  showSuccess,
  showInfo
}
