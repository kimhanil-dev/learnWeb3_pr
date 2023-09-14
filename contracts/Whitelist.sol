// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


contract Whitelist {
    
    // 화이트리스트 어드레스 승인 최대치
    uint8 public maxWhitelistedAddresses;

    // WhitelistedAddresses의 mapping을 생성
    // 해당되는 address가 whitelisted이면 address에 매팽된 boolean 값이 true가 된다.
    // boolean의 default값은 false
    mapping (address => bool) public whitelistedAddresses;
    
    // numAddressesWhitelisted는 몇개의 address들이 화이트리스트에 등록되었는지를
    // 나타낸다.
    uint8 public numAddressesWhitelisted;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    /*
        addAddressToWhitelist - This function adds the address of the sender to the whitelist
        이 함수는 화이트리스트에 sender의 address를 추가합니다.
    */
   function addAddressToWhiteL() public {
        // address가 이미 화이트리스트에 입력됐는지 확인한다.
        require(!whitelistedAddresses[msg.sender], "Sender has already been whitelisted");
        // numAddressesWhitedlisted < maxWhitelistedAddresses 인지 확인하고 에러를 throw 한다
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "More addresses cant be added, limit reached");
        // function을 콜한 sender의 address를 whiteliste에 등록한다.abi
        whitelistedAddresses[msg.sender] = true;
        // 화이트리스트에 등록된 address의 수를 증가시킨다.
        numAddressesWhitelisted += 1;
   }

}
