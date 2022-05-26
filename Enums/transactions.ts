import { red } from "@mui/material/colors";

export enum FIAT {
  FC_EURO = "EURO",
  FC_USDOLLAR = "USDOLLAR",
  FC_CADOLLAR = "CADOLLAR",
}

export enum Crypto {
  CC_BITCOIN = "BITCOIN",
  CC_LITECOIN = "LITECOIN",
  CC_DASH = "DASH",
}

export enum State {
  PS_ABORTED = "ABORTED",
  PS_RUNNING = "RUNNING",
  PS_FINISHED = "FINISHED",
}
export enum StateColor {
  PS_ABORTED = "error",
  PS_RUNNING = "primary",
  PS_FINISHED = "success",
}
