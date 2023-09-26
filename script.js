const item_form = document.getElementById('item-form');
const item_input=document.getElementById('item-input')
const input_invalid=document.getElementById('input-invalid')
const item_list=document.getElementById("item-list")
const clear_btn=document.getElementById('items-clear')
const itemFilter=document.getElementById('filter')
const form_btn=item_form.querySelector('button')
let isEditMode= false


function displayItems(){
    let itemsFromStorage

    if (localStorage.getItem('items')!==null){
        itemsFromStorage=JSON.parse(localStorage.getItem('items'))
    }else{
        itemsFromStorage=[]
    }

    itemsFromStorage.forEach((item => addItemToDom(item)))
    checkUI()
}


function addItem(e){
    e.preventDefault()

    const newItem=item_input.value

    if (newItem==''){
        input_invalid.innerText='فعالیت را وارد کنید'
        return
    }else {
        input_invalid.innerText=''
    }

    if (isEditMode){
        const itemToEdit= item_list.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.remove()
        form_btn.innerHTML="+ افزودن"
        form_btn.classList.replace('btn-primary','btn-dark')

        isEditMode=false
    }else{
        if (checkItemExist(newItem)){
            input_invalid.innerText='این فعالیت از قبل وجود دارد!'
            return;
        }else {
            input_invalid.innerText=''
        }
    }

    addItemToDom(newItem)

    addItemToStorage(newItem)

   item_input.value=''

    checkUI()
}


function checkItemExist(item){
    let itemsFromStorage

    if (localStorage.getItem('items')!==null){
        itemsFromStorage=JSON.parse(localStorage.getItem('items'))
    }else{
        itemsFromStorage=[]
    }

    return  itemsFromStorage.includes(item)
}

function addItemToDom(item){
    const li = document.createElement('li')
    li.className='list-item'
    li.textContent=item

    const icon=creatIcon('ri-close-circle-line')

    li.appendChild(icon)

    item_list.appendChild(li)

}

function addItemToStorage (item){
    let itemsFromStorage

    if (localStorage.getItem('items')!==null){
        itemsFromStorage=JSON.parse(localStorage.getItem('items'))
    }else{
        itemsFromStorage=[]
    }

    itemsFromStorage.push(item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function creatIcon(classes){
  const icon= document.createElement('i')
    icon.className=classes

    return icon
}


function onClickItem(e) {
    if (e.target.classList.contains('ri-close-circle-line')) {
        e.target.parentElement.remove()
        removeItemFromStorage(e.target.parentElement.textContent)
        checkUI()
    }else {
        isEditMode=true
        item_list.querySelectorAll('li').forEach( item => item.classList.remove('edit-mode'))
        e.target.classList.add('edit-mode')
        item_input.value=e.target.textContent

        form_btn.innerHTML="ویرایش  <i class=\"ri-pencil-fill\"></i>"
        form_btn.classList.replace('btn-dark','btn-primary')
    }
}

function clearItems(){
    item_list.innerHTML=''
    localStorage.removeItem('items')
    checkUI()
}

function removeItemFromStorage(item){
    let itemsFromStorage

    if (localStorage.getItem('items')!==null){
        itemsFromStorage=JSON.parse(localStorage.getItem('items'))
    }else{
        itemsFromStorage=[]
    }
    itemsFromStorage=itemsFromStorage.filter((i) => i !== item)

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function filterItems(e) {
    const items = item_list.querySelectorAll('li')
    const text = e.target.value

    items.forEach((item) => {
      const itemName=item.firstChild.textContent
        if (itemName.indexOf(text) !== -1){
            item.style.display='flex'
        }else {
            item.style.display='none'
        }
    })
}
function checkUI(){
    const items = item_list.querySelectorAll('li')

    if (items.length===0){
        clear_btn.style.display='none'
        itemFilter.style.display='none'
    }else {
        clear_btn.style.display='block'
        itemFilter.style.display='block'
    }
}

// Event Listener
item_form.addEventListener("submit", addItem)
item_list.addEventListener('click', onClickItem)
clear_btn.addEventListener('click',clearItems)
itemFilter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)

checkUI()