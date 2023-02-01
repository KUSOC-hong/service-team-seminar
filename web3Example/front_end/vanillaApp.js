// let accounts;
// // 메타마스크 연결 함수
// const metamaskConnection = async() => {
//     if (window.ethereum) {
//         try {
//             // 메타마스크 연결 위한 기본 api 코드
//             accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             // 연결된 지갑 주소 출력
//             console.log(accounts);
//         } catch (error) {
//             console.error(`Error:${error}`);
//         }


//     } else {
//         alert('Metamask should be installed!');
//     }
// }

// // 연결된 지갑 balance 조회 함수
// const checktheBalance = async() => {
//     let balance = await window.ethereum.request({ method: 'eth_getBalance',
//         params: [ accounts[0], 'latest' ]});
    
//     balance = parseInt(balance);
//     balance = balance / Math.pow(10.18);
//     console.log(balance);
// }

let accounts;
    
window.onload = function(){

    // 지갑 변경 시 handleAccountsChanged 함수 호출, 
    if (window.ethereum){
            this.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.request({ method: 'eth_accounts'})
            .then(handleAccountsChanged)
            .catch((err) => {});
    } else { alert("Please install metamask app"); }
}

const handleAccountsChanged = (acc) => {
    // 변경된 지갑 주소
    accounts = acc;
    
    // 지갑이 연결된 상태인 경우
    if ( accounts && accounts.length > 0 )
    {
        // connectwallet 버튼 숨김
    } else {

    }
}

// Metamask 연결 요청하는 함수
const metamaskConnection = async () => {
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
    .catch((err)=>{ console.log(err.code); });
    console.log( accounts );

    const element = document.getElementById('connect_wallet');
    element.innerHTML = `<span style="color:blue"> ${accounts}</span>`;

}

// 연결된 계정의 잔액 조회하는 함수
const checktheBalance = async () => {
    let balance = await window.ethereum.request({ method: 'eth_getBalance',
        params: [ accounts[0], 'latest' ]
    }).catch((err)  => {
        console.log(err);
    });
    balance = parseInt(balance);
    balance = balance / Math.pow(10,18);
    console.log(`Balance: ${balance} ETH `);

    const element = document.getElementById('check_balance');
    element.innerHTML = `<span style="color:blue"> ${balance}ETH </span>`;

}

// 다른 지갑으로 이더리움 전송하는 함수
const ethTransfer = async () => {
    // ETH
    const PRICE = 0.12;
    // 가나슈 네트워크 내 임의 지갑
    const ADDRESS = '0xCdaA8d01a40925d9e5ed15688e61eFD46f1351c4';
    const GAS_FEE = 65;

    let params = [
        {
            from: accounts[0],
            to: ADDRESS,
            gas: Number(21000).toString(16),
            gasPrice: (GAS_FEE * 10 ** 9).toString(16),
            value: (PRICE * 10 ** 18).toString(16)
        }
    ]

    let result = await window.ethereum.request( {method: 'eth_sendTransaction', params } ).catch((err)  => {
        console.log(err);
    });
    
    const element = document.getElementById('transferred');
    element.innerHTML = `<span style="color:blue"> When the transfer is complete, be sure to check your balance again.
        </span>`;
}
