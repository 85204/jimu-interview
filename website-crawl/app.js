const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })

const parse = function (str) {
  //清除某些节点两端存在的'\n'
  str = str.trim()
  str = str.split('\n')
  return {
    name: str[0],
    rate: str[2],
    month: str[4],
    status: str[6]
  }
}

nightmare
  .goto('https://box.jimu.com/Venus/List')
  .wait('.project')
  .evaluate(() => {
    const data = document.querySelectorAll('.project')
    let result = []
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      result.push(element.innerText)
    }
    return result
  })
  .end()
  .then((data) => {
    let result = []
    for (let i = 0; i < data.length; i++) {
      const str = data[i];
      result.push(parse(str))
    }
    console.log(result)
  })
  .catch(error => {
    console.error('failed:', error)
  })
