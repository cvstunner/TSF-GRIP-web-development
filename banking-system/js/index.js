let table_body = document.getElementById('table-body');
let customer_name_txt = document.getElementById('customer-name-txt');
let customer_balance_txt = document.getElementById('customer-balance-txt');
let amount_input = document.getElementById('amount-input');
let srch_input = document.getElementById('srch-input');
let myModal = new bootstrap.Modal(document.getElementById('transferModalLabel'), {
  keyboard: false
});
let selectedid = 0;

window.onload = () => {
  console.log('hi');
  getRecords();
}

function transaction_btn_clicked(){
  window.sessionStorage.setItem('userid', selectedid);
  window.location = './transactions.html';
}

function srch_btn_clicked(){
  let q = srch_input.value.replace(/\s/g, "+");
  console.log(q);
  query(`api/records/search?q=${q}`, 'get', null, function(res){
    if(res[0] === 200){
      populateBalanceTable(res[1]);  
    }
  });
}

function transfer_btn(){
  console.log('ok');
  myModal.hide();
  let current = new Date();
  let body = {'userid': selectedid, 'amount': amount_input.value, 'date': current.toLocaleDateString(), 'time': current.toLocaleTimeString()}
  query('api/records', 'put', body, function(res){
    if(res[0] === 200){
      getRecords();
    }
  });
}

function rowClicked(element){
  customer_name_txt.innerText = element.childNodes[1].innerText;
  customer_balance_txt.innerText = element.childNodes[3].innerText;
  selectedid = element.getAttribute('name');
}

function getRecords(){
  query('api/records', 'get', null, function(res){
    if(res[0] === 200){
      populateBalanceTable(res[1]);
    }
  });
}

function populateBalanceTable(data) {
    let htmlText = '';
    data.forEach((value, index) => {
        htmlText += `<tr onclick="rowClicked(this)" name=${value['userid']}><th scope="row">${value['userid']}</th><td>${value['name']}</td><td>${value['email']}</td><td>₹${value['amount']}</td></tr>`;
        if(selectedid === 0){
          customer_name_txt.innerText = value['name'];
          customer_balance_txt.innerText = '₹' + value['amount'];
          selectedid = 1;
        }
        else if(value['userid'] == selectedid){
          customer_name_txt.innerText = value['name'];
          customer_balance_txt.innerText = '₹' + value['amount']; 
        }
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