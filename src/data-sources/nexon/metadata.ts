import * as MetadataTypes from "@/types/metadata";
import requestNexon, { language_code } from "./requestNexon";

export async function getMetadataDescendant() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/descendant.json`,
  })) as MetadataTypes.MetadataDescendant[];
  return data;
}

export async function getMetadataWeapon() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/weapon.json`,
  })) as MetadataTypes.MetadataWeapon[];
  return data;
}

export async function getMetadataModule() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/module.json`,
  })) as MetadataTypes.MetadataModule[];
  return data;
}

export async function getMetadataReactor() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/reactor.json`,
  })) as MetadataTypes.MetadataReactor[];
  return data;
}

export async function getMetadataExternalComponent() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/external-component.json`,
  })) as MetadataTypes.MetadataExternalComponent[];
  return data;
}

export async function getMetadataReward() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/reward.json`,
  })) as MetadataTypes.MetadataReward[];
  return data;
}

export async function getMetadataStat() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/stat.json`,
  })) as MetadataTypes.MetadataStat[];
  return data;
}

export async function getMetadataVoidBattle() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/void-battle.json`,
  })) as MetadataTypes.MetadataVoidBattle[];
  return data;
}

export async function getMetadataTitle() {
  const data = (await requestNexon({
    path: `/static/tfd/meta/${language_code}/title.json`,
  })) as MetadataTypes.MetadataTitle[];
  return data;
}
