actor {
  public query func greet(name : Text) : async Text {
    "Hello, " # name # "!"
  };

  public query func howdy(name : Text) : async Text {
    "Howdy folks, specifically " # name # ""
  }
}
