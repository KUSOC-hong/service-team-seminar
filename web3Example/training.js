// 설치한 web3.js 모듈을 상수에 저장
const Web3 = require('web3');
// RPC 연동하기 위한 코드
const web3Provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3 = new Web3(web3Provider);

// 로컬 블록체인과 연동됐는지 여부 확인
// Accounts 배열 출력하는 함수 
const getAccounts = async () => {
    // js는 기본적으로 비동기적(실행결과가 반환되기 전에 다음 함수 실행)임
    // 동기적(하나의 함수가 끝날 때까지 대기)으로 동작 위해 async & await 사용
    // await으로 ganache에 있는 계정정보를 모두 가져온 뒤 반환되어야 account에 저장
    // async & await 제거 시 pending 발생
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);
}

// getAccounts();


// Account의 balance를 출력하는 함수
const getBalance = async () => {
    let accounts = await web3.eth.getAccounts();
    // 첫 번째 account의 balance 조회
    let balance = await web3.eth.getBalance(accounts[0]);
    // 백틱(`)과 해당 키워드($) 활용하면 간결하게 표현 가능 
    console.log(`account[0]: ${accounts[0]} balance: ${balance}`);
}

// 100 ETH == 100 * 10^18 Wei
// 1 ETH == 1 * 10^18 Wei
// 1 gwei == 0.000000001 ETH
// getBalance();

// Account 간 ETH 보내는 함수
const sendTransaction = async () => {
    let accounts = await web3.eth.getAccounts();
    // ETH를 보내기 전 balance 확인
    let balance0 = await web3.eth.getBalance(accounts[0]);
    let balance1 = await web3.eth.getBalance(accounts[1]);
    console.log(`account[0]: ${accounts[0]} balance: ${balance0}`);
    console.log(`account[1]: ${accounts[1]} balance: ${balance1}`);

    await web3.eth.sendTransaction({
        // 0번째 account에서 1번째 account로 1ETH를 전송
        from: accounts[3],
        to: accounts[1],
        value: 1000000000000000000
    });

    balance0 = await web3.eth.getBalance(accounts[3]);
    balance3 = await web3.eth.getBalance(accounts[1]);
    console.log(`account[3]: ${accounts[3]} balance: ${balance3}`);
    console.log(`account[1]: ${accounts[1]} balance: ${balance1}`);

}

sendTransaction();