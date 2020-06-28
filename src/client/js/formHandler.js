function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let fromText = document.getElementById('from_place').value
    let toText = document.getElementById('to_place').value
    let dateText = document.getElementById('travel_date').value
    let reqBody={
        fromEntry:`${fromText}`,
        toEntry:`${toText}`,
        dateEntry:`${dateText}`
    };

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/testing', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqBody),
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('destination').innerHTML=`Destination=${res.body.to}`;
        document.getElementById('from').innerHTML =`From=${res.body.from}`;
        document.getElementById('date123').innerHTML =`Travel Date=${res.body.date}`;
        document.getElementById('weather').innerHTML =`Weather=${res.body.weather}, Temperature=${res.body.temp}`;
        document.getElementById('img123').setAttribute('src',res.body.image);
    })
}

export { handleSubmit }
