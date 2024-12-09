// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () =>{
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            
            let statusChange = statusCurrent == 'available' ? 'unavailable' : 'available'

            const action = path + `/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.action = action
            formChangeStatus.submit()
            
        })
    })
}

//Delete items
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length > 0){
    const fromDeleteItem = document.querySelector("#form-delete-item")
    const path = fromDeleteItem.getAttribute("data-path")

    buttonDelete.forEach(button=>{
        button.addEventListener("click", ()=>{
            const isConfirm = confirm("Are you sure you want to delete the product?")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                
                const action = `${path}/${id}?_method=DELETE`
                fromDeleteItem.action = action
                fromDeleteItem.submit()
            }
        })
    })
}