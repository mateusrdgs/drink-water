class Renderer {
  _weightForm;

  constructor() {
    this._weightForm = document.querySelector('.weight_form')
  }

  init() {
    this._weightForm.addEventListener('submit', this._submit)
  }

  _submit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    let payload = {}

    for (const [key, value] of formData) {
      payload = { ...payload, [key]: value }
    }

    window.onWeightSubmit(payload)
  }
}

const renderer = new Renderer()

renderer.init()