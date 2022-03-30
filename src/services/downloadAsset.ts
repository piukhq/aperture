const downloadAsset = async (url, filename) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'image.jpg',
      'Access-Control-Allow-Origin': '*',
    },
  }

  fetch(url, requestOptions)
    .then((res) => {
      res.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]))
        const link = document.createElement('a')
        const modalDownloadTarget = document.querySelector('#modal-download-target') // Modals require a different element due to focus trap
        link.href = url
        link.setAttribute('download', filename)
        modalDownloadTarget ? modalDownloadTarget.appendChild(link) : document.body.appendChild(link)
        link.click()
      })
        .catch((err) => {
          return Promise.reject({Error: 'Something Went Wrong', err})
        })
    })
    .catch((err) => {
      return Promise.reject({Error: 'Something Went Wrong', err})
    })
}

export default downloadAsset

