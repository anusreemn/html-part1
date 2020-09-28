const table = document.querySelector('#vacanciesTable');

let tableColumns = [],
    tableColumnLength = 0;

getJson('./config/vacancies-config.json', function(response) {
    const config = response.tableColumns;
    if (config && config.length) {
        tableColumns = config;
        tableColumnLength = config.length;
        initialize();
    } else {
        showNoDataContainer();
    }
})

function initialize() {
    loadTableStructure();
    fetchTableData();
}

function fetchTableData() {
    getJson('./apis/vacancies.json', function(response) {
        const vacancies = response.data;
        if (vacancies && vacancies.length) {
            loadTableData(vacancies)
        } else {
            showNoDataContainer();
        }
    })
}

function loadTableStructure() {
    const thead = table.createTHead()
    const headerTr = thead.appendChild(document.createElement('TR'));
    headerTr.setAttribute('class', 'table-head')
    for(var col = 0; col < tableColumnLength; col++) {
        const th = headerTr.appendChild(document.createElement('TH'))
        th.appendChild(document.createTextNode(tableColumns[col].header));
    }
}

function loadTableData(data) {
    for(var row = 0; row < data.length; row++) {
        const rowTr = document.createElement('TR');
        for(var col = 0; col < tableColumnLength; col++) {
            const cell = rowTr.appendChild(document.createElement('TD'))
            const currentCell = tableColumns[col];
            let cellData = data[row][currentCell.key];
            if (currentCell.dataType === 'string') {
                // do any formatting required
            } else if (currentCell.dataType === 'button') {
                if (cellData) {
                    cell.appendChild(createButton(currentCell.innerText));
                    cellData = null;
                } else {
                    cellData = '-';
                }
            } else if (currentCell.dataType === 'number') {
                // do any formatting required
            } else if (currentCell.dataType === 'date') {
                // do any formatting required
            } else if (currentCell.dataType === 'link') {
                if (cellData) {
                    cell.appendChild(createLink(currentCell.innerText, cellData, true));
                    cellData = null;
                } else {
                    cellData = '-';
                }
            }

            if (cellData) {
                cell.appendChild(document.createTextNode(cellData));
            } else {
                // assume other html elements are inserted into cell
            }
        }
        table.appendChild(rowTr);
    }
}

function showNoDataContainer() {
    const body = table.createTBody();
    const row = body.insertRow();
    const td = row.insertCell();
    td.setAttribute('colspan', tableColumnLength);
    td.setAttribute('class', 'empty-row');
    td.innerHTML = 'No Data Available.';
}