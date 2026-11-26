/* Оболочка лабы «(A) Трансферы: стрелка»: страница во фрейме на всю ширину. <body data-desk="адрес">. */
(() => {
  const b = document.body, f = document.createElement('iframe')
  f.title = document.title; f.src = b.dataset.desk; f.style.cssText = 'display:block;border:0;width:100%;height:100vh;background:#000'
  b.style.cssText = 'margin:0;background:#000'; b.append(f)
})()
