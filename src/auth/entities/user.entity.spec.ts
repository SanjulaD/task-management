import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
describe("User entity", () => {
  describe("validatePassword", () => {
    let user: User;

    beforeEach(() => {
      user = new User();
      user.password = "testSAlt";
      bcrypt.hash = jest.fn();
    });

    it("return true as password is valid", async () => {
      let salt = await bcrypt.genSalt(10);

      bcrypt.hash.mockReturnValue("correctPassword");
      expect(bcrypt.hash).not.toHaveBeenCalled();
      let enteredPassword = await bcrypt.hash("correctPassword", salt);
      let result: boolean = await bcrypt.compare("correctPassword", enteredPassword);

      expect(result).toEqual(true);
    });

    it("return false as password is invalid", async () => {
      let salt = await bcrypt.genSalt(10);

      bcrypt.hash.mockReturnValue("wrongPassword");
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const enteredPassword = await bcrypt.hash("wrongPassword", salt);
      const result: boolean = await bcrypt.compare("correctPassword", enteredPassword);

      expect(result).toEqual(false);
    });
  });
});
