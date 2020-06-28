function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let fromText = document.getElementById('from_place').value
    let toText = document.getElementById('to_place').value
    let dateText = document.getElementById('travel_date').value
    let todoText=document.getElementById('todo_list').value
    let reqBody={
        fromEntry:`${fromText}`,
        toEntry:`${toText}`,
        dateEntry:`${dateText}`,
        todoEntry:`${todoText}`
    };

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/testing', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqBody),
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('destination').innerHTML=`Destination=${res.to}`;
        document.getElementById('from').innerHTML =`From=${res.from}`;
        document.getElementById('date123').innerHTML =`Travel Date=${res.date}`;
        document.getElementById('weather').innerHTML =`Weather=${res.weather}, Temperature=${res.temp}`;
        document.getElementById('img123').setAttribute('src',res.image);
        document.getElementById('todo123').innerHTML=`Todo=${res.todo_list}`;
    })
}

export { handleSubmit }
