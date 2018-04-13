let fs = require("fs");
let data = fs.readFileSync("db.test.sql", "utf-8");
let store = []
findTable(data, store)
data = fs.readFileSync("db.prd.sql", "utf-8");
let store2 = []
findTable(data, store2)
let result = compareArray(store, store2)
console.log(result)

function compareArray(store, store2) {
  for (let i = 0; i < store.length; i++) {
    const num = store2.findIndex((v) => v === store[i])
    if (num !== -1) {
      store2.splice(num, 1)
    }
  }
  return store2
}

function getTableName(num) {
  const left = data.indexOf('`', num)
  const right = data.indexOf('`', left + 1)
  return data.substring(left + 1, right)
}

function findTable(data, store) {
  let count = data.indexOf('CREATE TABLE ')
  while (count !== -1) {
    count += 13
    const tableName = getTableName(count)
    if (store.findIndex(v => v === tableName) === -1) {
      store.push(tableName)
    }
    count = data.indexOf('CREATE TABLE ', count)
  }
}
