window.addEventListener('DOMContentLoaded', ()=>{
  'use strict'

  let tabTitle = document.querySelectorAll('.capability__tab-title'),
      tabSwitches= document.querySelector('.capability__tab-switches'),
      tabContent = document.querySelectorAll('.capability__tab-content')
  
  function hideTabContent(a) {
    for (let index = a; index < tabContent.length; index++) {
      tabContent[index].classList.remove('capability__tab-content_show')
      tabContent[index].classList.add('capability__tab-content_hide')
      tabTitle[index].classList.remove('capability__tab-title_active')
    }
  }
  hideTabContent(1)

  function showTabContent(b) {
    if(tabContent[b].classList.contains('capability__tab-content_hide')){
      tabContent[b].classList.add('capability__tab-content_show')
      tabContent[b].classList.remove('capability__tab-content_hide')
      tabTitle[b].classList.add('capability__tab-title_active')
    }
  }

  tabSwitches.addEventListener('click', (e)=>{
    let target = e.target;
    
    if(target && target.classList.contains('capability__tab-title')){
      for (let index = 0; index < tabTitle.length; index++) {
        if(target == tabTitle[index]){
          hideTabContent(0)
          showTabContent(index)
        }
        
      }
    }

  })

  let getCallBtn = document.querySelector('.main-screen__get-call'),
      popup = document.querySelector('.popup'),
      popupClose = document.querySelector('.popup__close')

  getCallBtn.addEventListener('click', ()=>{
    popup.classList.add('popup_show')
  })

  popupClose.addEventListener('click', ()=>{
    popup.classList.remove('popup_show')
  })
  
})