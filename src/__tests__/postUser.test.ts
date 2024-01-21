import { postUser } from "../Services/PostUser";
import "jest-localstorage-mock";

describe("Test postUser function", () => {
  const newUSer = {
    name: "someName",
    email: "someMail",
    phone: "11111111",
    cpf: "12345678911",
  };

  const sameEmailUser = {
    name: "someName",
    email: "someMail",
    phone: "11111111",
    cpf: "12345678912",
  };

  it("should create a new user", () => {
    const createdUser = postUser(newUSer);

    expect(createdUser).toEqual(newUSer);
  });

  it("Should return an empty object when trying to create an user with same cpf", () => {
    postUser(newUSer);
    const secondUser = postUser(newUSer);

    expect(secondUser).toEqual({});
  });

  it("Should return an empty object when trying to create an user with same email", () => {
    postUser(newUSer);
    const secondUser = postUser(sameEmailUser);

    expect(secondUser).toEqual({});
  });

  it("Should return an empty object when failing", () => {
    localStorage.clear();
    jest.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new Error("SomeError");
    });

    const createdUser = postUser(newUSer);
    expect(createdUser).toEqual({});
  });
});
