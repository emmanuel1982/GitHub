const output = document.getElementById('output');
const people = document.createElement('div');
const list = document.createElement('li');

const getUser = async (id) => {
    try {
        const response = await fetch (`https://swapi.dev/api/people/${id}/`);
        const data  = await response.json();
        list.innerHTML = data.name;
        //list.innerHTML = JSON.stringify(data); - shows all data
    }
    catch (err) {
        console.error(err);
    }
    output.appendChild(people);
    people.appendChild(list);
};
getUser(prompt());