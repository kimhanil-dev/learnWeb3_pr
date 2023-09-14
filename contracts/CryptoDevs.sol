// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {

    // _price는 Crpyto dev NFT의 가격을 의미합니다.
    uint256 constant public _price = 0.01 ether;

    // 준비된 CryptoDevs의 최대 개수를 의미합니다.
    uint256 constant public maxTokenIds = 20;

    // Whitelist contract instance
    Whitelist whitelist;

    // 화이트리스트 멤버들을 위해 준비된 토큰의 수
    uint256 public reservedTokens;
    uint256 public reservedTokensClaimed = 0;

    /**
      * @dev ERC721 constructor takes in a `name` and a `symbol` to the token collection.
      * name in our case is `Crypto Devs` and symbol is `CD`.
      * Constructor for Crypto Devs takes in the baseURI to set _baseTokenURI for the collection.
      * It also initializes an instance of whitelist interface.
      */
    constructor(address whitelistContract) ERC721("Crypto Devs", "CD"){
        whitelist = Whitelist(whitelistContract);
        reservedTokens = whitelist.maxWhitelistedAddresses();
    }

    function mint() public payable {
        // 화이트리스트 예약에 대한 충분한 공간을 확실히 합니다.
        require(totalSupply() + reservedTokens - reservedTokensClaimed < maxTokenIds, "EXCEEDED_MAX_SUPPLY");

        // 유저가 화이트리스트에 등록돼있다면, 토큰 갯수가 남았는지 확인합니다.
        if(whitelist.whitelistedAddresses(msg.sender) && msg.value < _price)
        {
            // 유저가 NFT를 이미 가지고 있지 않은지 확인합니다.
            require(balanceOf(msg.sender) == 0, "ALREADY_OWNED");
            reservedTokensClaimed +1;
        } else {
            // 유저가 화이트리스트에 등록된 인원이 아니라면, 충분한 ETH를 전송하도록 합니다.
            require(msg.value >= _price, "NOT_ENOUGH_ETHER");
        }
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
    }

    /**
    * @dev withdraw sends all the ether in the contract
    * to the owner of the contract
      */
    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

