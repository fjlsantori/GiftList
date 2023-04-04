const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require('prompt-sync')();

const serverUrl = 'http://localhost:1225';
// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

async function main() {

  try{
  // TODO: how do we prove to the server we're on the nice list? 
  // find the proof that norman block is in the list 

  // get the root
  const root = merkleTree.getRoot();

  //We ask for input name to look on the list
  const name = prompt('Type in your name: ');

  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name,
    proof
  });

  console.log({ gift });
  }catch(error){
    console.log("In catch block logging error.message:", error.message);
  }

}

main();