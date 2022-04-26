// console.log("Client side javascript");  
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



weatherform.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location = search.value;
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?address='+location).then((response)=>
{
    response.json().then((data)=>
    {
        if(data.error)
        {
            msg1.textContent = data.error;
            // console.log(data.error);
        }
        else
        {
            // console.log(data);
            msg1.textContent = data.place;
            msg2.textContent = data.forecast;

        }
    })
})
})