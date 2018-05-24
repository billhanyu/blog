const siteURL = process.env.NODE_ENV === 'production' ? 'http://vcm-3422.vm.duke.edu' : 'http://localhost';

module.exports = {
  blogName: 'Bill Yu\'s Blog',
  githubLink: 'https://github.com/billhanyu/',
  baseURL: `${siteURL}:1717`,
  siteURL,
};
