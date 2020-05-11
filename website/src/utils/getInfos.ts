import { UAParser } from 'ua-parser-js';

export const getInfos = (windowInfos: any): any => {
  const parser = new UAParser();

  const { browser, os, engine } = parser.getResult();

  return {
    os,
    engine,
    browser,
    language: navigator.language,
    page: windowInfos.location.pathname,
  };
};
