import * as AccountTypes from "@/types/account";
import requestNexon, { language_code } from "./requestNexon";

export async function getAccountOuid(userName: string) {
  const sanitizedUserName = userName.trim();

  const data = (await requestNexon({
    path: `/tfd/v1/id`,
    params: { user_name: sanitizedUserName },
  })) as AccountTypes.AccountOuid;
  return data.ouid;
}

export async function getAccount(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/basic`,
    params: { ouid },
  })) as AccountTypes.Account;
  return data;
}

export async function getAccountDescendant(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/descendant`,
    params: { ouid },
  })) as AccountTypes.AccountDescendant;
  return data;
}

export async function getAccountWeapon(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/weapon`,
    params: { ouid, language_code },
  })) as AccountTypes.AccountWeapon;
  return data;
}

export async function getAccountReactor(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/reactor`,
    params: { ouid, language_code },
  })) as AccountTypes.AccountReactor;
  return data;
}

export async function getAccountExternalComponent(ouid: string) {
  const data = (await requestNexon({
    path: `/tfd/v1/user/external-component`,
    params: { ouid, language_code },
  })) as AccountTypes.AccountExternalComponent;
  return data;
}
