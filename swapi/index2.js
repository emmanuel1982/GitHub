const menuPrimary = document.getElementById('primary');
const menuSecondary = document.getElementById('secondary');
let menuPrimarySelector = ['something', 'people'];
let menuPrimarySelector2 = ['something', 'people'];
//debugger;
//create primary menu
const menuOptions = async (menuPrimarySelector2) => {
    try {
        const response = await fetch(`https://swapi.dev/api/`);
        const data = await response.json();
        menuPrimarySelector2 = Object.keys(data);
        console.log(menuPrimarySelector2);
    } 
    catch (error) {      
    }
}

console.log(menuPrimarySelector2);
console.log(menuOptions(menuPrimarySelector2));

//find id
const idFinder = async (something) => {
    try {
        const response = await fetch(`https://swapi.dev/api/${something}/`);
        const data = await response.json();
        function getKeyByValue(data, value) {
            return Object.keys(data.results[1]).find(key => data.results[1][key] === value);
        }
        console.log(getKeyByValue(data, "C-3PO"));
    }
    catch (error) {
        console.error(error);
    }
};
idFinder(menuPrimarySelector[1]);



//create dropdown menu
const dropdownMenu = async (something) => {
        try {
            
            const response = await fetch(`https://swapi.dev/api/${something}/`);
            const data = await response.json();

            for (let i = 1; i < Object.values(data)[0]-75; i++) { //reducing by 75 results
                const response = await fetch(`https://swapi.dev/api/${something}/${i}`);
                const data = await response.json();
                let newOption = document.createElement('option');
                newOption.innerHTML = data.name;
                menuSecondary.appendChild(newOption);
            }
            let loading = document.getElementById('loading');
            menuSecondary.remove('loading');
        }
        catch (error) {
            console.error(error);
        }
};

dropdownMenu(menuPrimarySelector[1]);

//create output
let finder = document.getElementById('secondary');
finder.addEventListener('change', () => {
        
        const output = async (id) => {
            try {
                    // const i = finder.options[finder.selectedIndex].value;
                    // console.log(i);
                    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
                    const data = await response.json();
                    const addData = document.getElementById('output');
                    const createTable = document.createElement('table')
                    createTable.setAttribute('id', 'outputTable');
                    addData.appendChild(createTable);
                    for (let i = 1; i < Object.keys(data).length; i++) {
                        const addTr = document.createElement('tr');
                        const addTdKey = document.createElement('td');
                        const addTdValue = document.createElement('td');

                        //add key
                        createTable.appendChild(addTr);
                        addTr.appendChild(addTdKey);
                        addTdKey.setAttribute('id', `col1row${i}`);
                        addTdKey.append(Object.keys(data)[i]);

                        //add value
                        createTable.appendChild(addTr);
                        addTr.appendChild(addTdValue);
                        addTdValue.setAttribute('id', `col2row${i}`);
                        addTdValue.append(Object.values(data)[i]);
                    }       
            }
            catch (error) {
                console.error(error);
            }
    };
    output(2);
});