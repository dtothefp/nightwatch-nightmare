import {cbToProm as promisify} from 'boiler-utils';
import selenium from 'selenium-standalone';

export default async function() {
  const install = promisify(selenium.install);
  const start = promisify(selenium.start);

  await install({
    version: '2.45.0',
    baseURL: 'https://selenium-release.storage.googleapis.com',
    drivers: {
      chrome: {
        version: '2.15',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com'
      }
    },
    logger: console.log.bind(console),
    progressCb(totalLength, progressLength, chunkLength) {
      //process.stdout.write('*PROGRESS*', progressLength);
    }
  });

  return await start({
    spawnOptions: {
      stdio: 'ignore'
    }
  });
}
