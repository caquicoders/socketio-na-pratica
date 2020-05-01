import { UAParser } from 'ua-parser-js';

export const getInfos = (windowInfos: any): any => {
  const parser = new UAParser();
  const { browser, engine, os, device } = parser.getResult();

  return {
    os,
    device,
    engine,
    browser,
    language: navigator.language,
    page: windowInfos.location.pathname,
  };
};
