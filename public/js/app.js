
console.log('Client side javascript file is loaded!')


const Weatherform = document.querySelector('form')
const searchedElement = document.querySelector('input')


// Text Content to return output accoring to the entered input
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')



Weatherform.addEventListener('submit', (e) => {

    msgOne.textContent = 'Loading.....'
    msgTwo.textContent = ''

    const data = searchedElement.value
        e.preventDefault()
        
        fetch('http://localhost:3000/weather?address='+ data).then((response)=> {
        response.json().then((data)=> {
                if(data.error){
                    msgOne.textContent = data.error
                }
                else{

                    msgOne.textContent = data.location
                    msgTwo.textContent = data.forecast
                    // console.log(data.location)
                    // console.log(data.forecast)
                }
        })
})
})