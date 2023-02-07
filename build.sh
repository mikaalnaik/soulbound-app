#!/usr/bin/env bash
dfx stop
set -e
# trap 'dfx stop' EXIT

dfx start --background --clean

dfx identity new admin --disable-encryption || true
ADMIN=$(dfx --identity admin identity get-principal)  

echo 'Admin'
echo $ADMIN

dfx identity use admin

dfx deploy --argument "(
  principal\"$ADMIN\", 
  record {
    logo = record {
      logo_type = \"image/png\";
      data = \"\";
    };
    name = \"Attendance Proof Token\";
    symbol = \"APT\";
    maxLimit = 100;
  }
)"


dfx canister call token mintDip721 \
"(
  principal\"$ADMIN\", 
  vec { 
    record {
      purpose = variant{Rendered};
      data = blob\"hello\";
      key_val_data = vec {
        record { key = \"description\"; val = variant{TextContent=\"The first NFT\"}; };
        record { key = \"tag\"; val = variant{TextContent=\"anime\"}; };
        record { key = \"contentType\"; val = variant{TextContent=\"text/plain\"}; };
        record { key = \"locationType\"; val = variant{Nat8Content=4:nat8} };
      }
    }
  }
)"
dfx canister call token mintDip721 \
"(
  principal\"$ADMIN\", 
  vec { 
    record {
      purpose = variant{Rendered};
      data = blob\"hello\";
      key_val_data = vec {
        record { key = \"description\"; val = variant{TextContent=\"The second NFT\"}; };
        record { key = \"tag\"; val = variant{TextContent=\"anime\"}; };
        record { key = \"contentType\"; val = variant{TextContent=\"text/plain\"}; };
        record { key = \"locationType\"; val = variant{Nat8Content=4:nat8} };
      }
    }
  }
)"


yarn dev