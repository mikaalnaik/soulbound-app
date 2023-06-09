#!/usr/bin/env bash
dfx stop
set -e
# trap 'dfx stop' EXIT

dfx start --background --clean
dfx identity new alice --disable-encryption || true
ALICE=$(dfx --identity alice identity get-principal)
dfx identity new bob --disable-encryption || true
BOB=$(dfx --identity bob identity get-principal)
dfx identity new  mikaal --disable-encryption || true
MIKAAL=$(dfx --identity mikaal identity get-principal)

dfx identity new admin --disable-encryption || true
ADMIN=$(dfx --identity admin identity get-principal)  

echo "Bob:" 
echo $BOB

echo 'Alice:'
echo $ALICE

echo 'Mikaal'
echo $MIKAAL

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
    name = \"My DIP721\";
    symbol = \"DFXB\";
    maxLimit = 10;
  }
)"


dfx canister call token mintDip721 \
"(
  principal\"$MIKAAL\", 
  vec { 
    record {
      purpose = variant{Rendered};
      data = blob\"Dfinity\";
      key_val_data = vec {
        record { key = \"description\"; val = variant{TextContent=\"Dfinity Grant Recipient 2022\"}; };
        record { key = \"tag\"; val = variant{TextContent=\"Accreditation\"}; };
        record { key = \"contentType\"; val = variant{TextContent=\"text/plain\"}; };
        record { key = \"locationType\"; val = variant{Nat8Content=4:nat8} };
      }
    }
  }
)"

dfx canister call token mintDip721 \
"(
  principal\"$ALICE\", 
  vec { 
    record {
      purpose = variant{Rendered};
      data = blob\"Mega Tour 2022\";
      key_val_data = vec {
        record { key = \"description\"; val = variant{TextContent=\"Rihanna Concert 2022\"}; };
        record { key = \"tag\"; val = variant{TextContent=\"Attendence\"}; };
        record { key = \"contentType\"; val = variant{TextContent=\"text/plain\"}; };
        record { key = \"locationType\"; val = variant{Nat8Content=4:nat8} };
      }
    }
  }
)"

dfx canister call token mintDip721 \
"(
  principal\"$MIKAAL\", 
  vec { 
    record {
      purpose = variant{Rendered};
      data = blob\"hello\";
      key_val_data = vec {
        record { key = \"description\"; val = variant{TextContent=\"Taylor Swift Concert 2022\"}; };
        record { key = \"tag\"; val = variant{TextContent=\"Attendence\"}; };
        record { key = \"contentType\"; val = variant{TextContent=\"text/plain\"}; };
        record { key = \"locationType\"; val = variant{Nat8Content=4:nat8} };
      }
    }
  }
)"
dfx canister call token mintDip721 \
"(
  principal\"$ALICE\", 
  vec { 
    record {
      purpose = variant{Rendered};
      data = blob\"hello\";
      key_val_data = vec {
        record { key = \"description\"; val = variant{TextContent=\"University of Guelph 2011\"}; };
        record { key = \"tag\"; val = variant{TextContent=\"Accreditation\"}; };
        record { key = \"contentType\"; val = variant{TextContent=\"text/plain\"}; };
        record { key = \"locationType\"; val = variant{Nat8Content=4:nat8} };
      }
    }
  }
)"

dfx identity use mikaal


# Transfer Tests
echo "Transfer from Mikaal to Alice"
dfx canister call token transferFromDip721 "(principal\"$MIKAAL\", principal\"$ALICE\", 0)"
echo 'Transfer from Alice To Bob'
dfx canister call token safeTransferFromDip721 "(principal\"$ALICE\", principal\"$BOB\", 0)"
echo "Balance of the Principal"
dfx canister call token balanceOfDip721 "(principal\"$(dfx identity get-principal)\")"

# Burn Tests
echo "balance of mikaal"
dfx canister call token balanceOfDip721 "(principal\"$MIKAAL\")"

# # dfx canister call token burn "(principal\"$MIKAAL\",  0)"
# echo "balance of mikaal afterwards"
# dfx canister call token balanceOfDip721 "(principal\"$MIKAAL\")"

echo "DONE"




# dfx canister call token transferFromDip721 "(principal\"$(dfx identity get-principal)\", principal\"sf4in-o2su2-iahwt-m3bdy-7wkiy-vs2rt-levtm-zgqsq-tab7p-yu4fg-faeALICE=sf4in-o2su2-iahwt-m3bdy-7wkiy-vs2rt-levtm-zgqsq-tab7p-yu4fg-fae\", 0)"

