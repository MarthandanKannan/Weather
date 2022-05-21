console.log('client side js filecd')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const moreDetails = document.querySelector('#moreDetails')


weatherForm.addEventListener('submit' , (e) =>{
        e.preventDefault()
        const location = searchElement.value
        message1.textContent = 'Loading...'
        message2.textContent = ''
        
        fetch('/weather?address='+location).then((response) =>{
        response.json().then((data)=>{
        console.log(data)
        if(data.error){
           message1.textContent = data.error
        } else {
            message1.textContent = data.location + '. '
            message2.textContent = data.forecastData
            moreDetails.addEventListener('click' , (e) =>{
                window.location = '/weatherFull?address='+location
            })
        }
    })
})
})

moreDetails.addEventListener('submit', (e) =>{
   e.preventDefault()
})

