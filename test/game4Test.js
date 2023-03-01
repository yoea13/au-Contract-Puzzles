const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const signer0 = ethers.provider.getSigner(0);
    const address0 = await signer0.getAddress();
    const signer1 = ethers.provider.getSigner(1);
    const address1 = await signer1.getAddress();

    await game.connect(signer0).write(address1);
    // nested[address1][signer0] = true;
    await game.connect(signer1).write(address0);
    // nested[address0][signer1] = true;

    await game.connect(signer0).win(address1);
    // require(nested[msg.sender][y], "Nope. Try again!");

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
