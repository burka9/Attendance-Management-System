export function encrypt(word) {
  let temp = '', tmp = ''
  let div = 2
  for (let i=0; i<word.length; i++) {
      tmp = word.charCodeAt(i)
      if (tmp < 100) tmp = tmp.toString() + ','
      temp += tmp
  }
  
  let x = temp.indexOf(',')
  let spt = temp.split(',')[0]
  let rem = x!=-1 ? temp.slice(x) : ''
  
  while(spt%div != 0)
      div++
  
  spt = Number(spt / div)
  spt += div
  spt *= div
  
  div = div.toString()
  
  while(div.length < 5) div += 'x'
  
  return ''.concat(spt).concat(rem).concat(div)
}

export function decrypt(word) {
  let temp = ''
  let d = word.slice(word.length-5)
  word = word.slice(0, word.length-5)
  let div = ''
  
  for (let i=0; i<d.length; i++)
      div += d[i] !== 'x' ? d[i] : ''
  div = Number(div)
  
  let x = word.indexOf(',')
  let spt = word.split(',')[0]
  let rem = x!=-1 ? word.slice(x) : ''
  
  spt /= div
  spt -= div
  spt *= div
  
  word = ''.concat(spt).concat(rem)
  let tmp = ''
  
  for (let i=0; i<word.length; i += 3) {
      tmp = word.slice(i, i+3)
      tmp = tmp.split(',')[0]
      temp += String.fromCharCode(tmp)
  }
  
  return temp
}
