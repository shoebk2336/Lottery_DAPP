// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address payable [] public participants;

    address public Manager  ;

    constructor(){
        Manager=msg.sender;
    }

    function participate () payable public {

        require(msg.value ==3 *1e9 wei,"Ether are not suffuicient");
        participants.push(payable (msg.sender));
    }

    function GetBalance() public view  returns (uint) {
        require(msg.sender==Manager,"You are not Manager");
        return address(this).balance;
    }
    

    function random() private  pure returns (uint){
        return 1;
    }
    

    function Winner() payable public returns(address) {
        require(Manager==msg.sender);
        require(participants.length>=3,"Particpants are less than 3");
        uint r=random();

        uint index ;
        index=r%participants.length;
        
        address payable _winner=participants[index];
        _winner.transfer(GetBalance());
        participants=new address payable [](0);
        return (_winner);
    }
}