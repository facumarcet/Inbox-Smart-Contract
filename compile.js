const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxpath = path.resolve(__dirname, 'Contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxpath, 'UTF-8');

let input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

let output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
const abi = output.contracts['Inbox.sol']['Inbox'].abi
const bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;
// console.log(abi);
// console.log(bytecode);
exports.abi = abi;
exports.bytecode = bytecode;