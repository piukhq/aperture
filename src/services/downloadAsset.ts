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
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
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
