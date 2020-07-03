App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets.

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Adoption.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ipDatabaseArtifact = data;
      App.contracts.ipDatabase = TruffleContract(ipDatabaseArtifact);

      // Set the provider for our contract
      App.contracts.ipDatabase.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".submit", App.handleAdopt);
  },

  markAdopted: function (adopters, account) {
    var adoptionInstance;

    App.contracts.ipDatabase.deployed()
      .then(function (instance) {
        ipDatabaseInstance = instance;

        // return ipDatabaseInstance.getAdopters.call();
        return null;
      })
      .then(function (adopters) {
        
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var fingerprint = document.querySelectorAll("input.fingerprint")[0].value;

    var ipDb;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.ipDatabase.deployed()
        .then(function (instance) {
          ipDb = instance;

          // Execute adopt as a transaction by sending account
          return ipDb.addEntry(fingerprint);
        })
        .then(function (result) {
          // return App.markAdopted();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
