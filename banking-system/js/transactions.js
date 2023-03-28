let table_body = document.getElementById('table-body');
let customer_name_txt = document.getElementById('customer-name-txt');

window.onload = () => {
  console.log('hi');
  getRecords();
}

function back_btn_clicked(){
  window.location = './index.html';
}


function getRecords(){
  query(`api/transactions?uid=${window.sessionStorage.getItem('userid')}`, 'get', null, function(res){
    if(res[0] === 200){
      populateTransactionsTable(res[1][0]);
      customer_name_txt.innerText = res[1][1][0]['name'];
    }
  });
}

function populateTransactionsTable(data) {
    let htmlText = '';
    data.forEach((value, index) => {
        htmlText += `<tr onclick="rowClicked(this)" name=${value['transactionid']}><th scope="row">${index+1}</th><td>${value['date']}</td><td>${value['time']}</td><td>₹${value['amount']}</td><td>₹${value['balance']}</td></tr>`;
    });
    table_body.innerHTML = htmlText;
}

function query(route, method, body, response){
    if (method === 'get'){
        fetch(route, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        }).then(async function(res){
            if (res.status === 200){
                return [res.status, await res.json()];
            }
            else{
                return [res.status, await res.json()];
            }
        }).then(function(data){
            if (data[0] === 200){
                console.log(route, " data:" ,data);
                response(data);
            }
            else{
                response(data);
            }
        }).catch(function(err) {
            console.log(err);
            alert('Error');
        });
    }
    else {
        fetch(route, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: body})
        }).then(async function(res) {
            console.log(res);
            if (res.status === 200){
                return [res.status, await res.json()];
            }
            else{
                return [res.status, await res.json()];
            }
        }).then(function(data) {
            if (data[0] === 200){
                console.log(route, " query:" ,data);
                response(data);
            }
            else{
                response(data);
            }
        }).catch(function(err) {
            console.log(err);
            alert('Error');
        });
    }
}