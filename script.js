const item_form = document.getElementById('item-form');
const item_input=document.getElementById('item-input')
const input_invalid=document.getElementById('input-invalid')
const item_list=document.getElementById("item-list")

function addItem(e){
    e.preventDefault()

    const newItem=item_input.value

    if (newItem==''){
        input_invalid.innerText='فعالیت را وارد کنید'
        return
    }else {
        input_invalid.innerText=''
    }

    const li = document.createElement('li')
    li.className='list-item'
    li.textContent=newItem

    const icon=creatIcon('ri-close-circle-line')

    li.appendChild(icon)

    item_list.appendChild(li)

   item_input.value=''
}

function creatIcon(classes){
  const icon= document.createElement('i')
    icon.className=classes

    return icon
}


// Event Listener
item_form.addEventListener("submit", addItem)