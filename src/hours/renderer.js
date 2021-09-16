class Renderer {
  _hoursForm;

  constructor() {
    this._hoursForm = document.querySelector('.hours_form')
  }

  init() {
    this._hoursForm.addEventListener('submit', this._submit)
  }

  _submit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    let payload = {}

    for (const [key, value] of formData) {
      payload = { ...payload, [key]: value }
    }

    window.onHoursSubmit(payload)
  }
}

const renderer = new Renderer()

renderer.init()