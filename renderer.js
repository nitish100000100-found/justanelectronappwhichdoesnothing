const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()



// require("fs")     
// require("path")   
// require("os")      
// thsi will give error in console but it will not stop the app
